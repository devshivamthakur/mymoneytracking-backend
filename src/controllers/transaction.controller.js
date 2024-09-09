import Joi from "joi";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { HTTP_STATUS_CODES } from "../utils/ErrorConstant.js";
import { CategoryModal } from "../models/category.modal.js";
import { TransactionModal } from "../models/transaction.modal.js";
import Mongoose from "mongoose";
import { ApiResponse } from "../utils/ApiResponse.js";
import moment from "moment";
import { BudgetModal } from "../models/budget.modal.js";
import { filterByValues, MONGO_OBJECT_ID_REGX, sortByValues } from "../utils/constants.js";

//create a transaction
const addTransaction = asyncHandler(async (req, res) => {
    const schema = Joi.object({
        amount: Joi.number().required().min(1),
        transaction_date: Joi.date().required(),
        description: Joi.string(), // optional
        category: Joi.string().required(),
        budget_id: Joi.string().regex(MONGO_OBJECT_ID_REGX).required().messages({
            'string.pattern.base': 'invalid budget id',
        }), // Validates MongoDB ObjectId
    })

    //vailidate request body
    const { error } = schema.validate(req.body)
    if (error) throw new ApiError(HTTP_STATUS_CODES.BAD_REQUEST, error.details[0].message)

    //check for transaction date it  must be from current Month
    const isCurrentMonthDate = moment(req.body.transaction_date).isSame(moment(), "month")  
    if(!isCurrentMonthDate) throw new ApiError(HTTP_STATUS_CODES.OK, "Transaction date must be from current Month")

    //validate and get category id
    const categoryId = await CategoryModal.findOne({
        category_name: req.body.category
    })
    if (!categoryId) throw new ApiError(HTTP_STATUS_CODES.BAD_REQUEST, "please provide a valid category")

    //validate the category id
    const validateBudget =await BudgetModal.findOne({_id: new Mongoose.Types.ObjectId(req.body.budget_id)})
    if(!validateBudget) throw new ApiError(HTTP_STATUS_CODES.BAD_REQUEST, "Invalid budget id")

    const createdTransaction =await TransactionModal.create({
        amount: req.body.amount,
        budget: new Mongoose.Types.ObjectId(req.body.budget_id),
        category: categoryId.id,
        description: req.body.description || "",
        transactionDate: req.body.transaction_date,
        user: new Mongoose.Types.ObjectId(req.user._id)

    })

    if (!createdTransaction.id) throw new ApiError(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, "Transaction not created due to internal server error.")

    //now update the spend in the budget
    validateBudget.spendAmount = (validateBudget.spendAmount || 0) +  Number(req.body.amount)
    validateBudget.save()

    return res.status(200).json(new ApiResponse(HTTP_STATUS_CODES.OK, createdTransaction.id, "transaction created successfully."))

})

//get transaction info based on transaction id
const getTransactionInfo = asyncHandler(async(req, res)=>{
    const schema = Joi.object({
        transaction_id: Joi.string().regex(MONGO_OBJECT_ID_REGX).required().messages({
            'string.pattern.base': 'invalid transaction_id',
        }), 
    })

    //validate transaction id
    const {error} = schema.validate(req.query)
    if(error) throw new ApiError(HTTP_STATUS_CODES.BAD_REQUEST, error.message)

     const transactionInfo =await TransactionModal.aggregate([
        {
            $match: {
                _id: new Mongoose.Types.ObjectId(req.query.transaction_id)
            }
        },
        {
            $lookup: {
                from: "categories",
                localField: "category",
                foreignField: "_id",
                as: "categoryInfo",
                pipeline:[
                    {
                        $project:{
                            _id:0
                        }
                    }
                ]
            }
        },
        {
            $addFields:{
                category:{
                    $first:"$categoryInfo"
                }
            }
        },
        {
            $project:{
                categoryInfo:0,
                budget: 0,
                updatedAt: 0,
                user: 0

            }
        }
     ])
     
     if(!transactionInfo.length) throw new ApiError(HTTP_STATUS_CODES.NOT_FOUND, "no transaction found")

    return res.status(HTTP_STATUS_CODES.OK).json(new ApiResponse(HTTP_STATUS_CODES.OK, transactionInfo[0], "success"))


})

//delete transaction based on transaction id
const deleteTransaction = asyncHandler(async (req, res) => {
    const schema = Joi.object({
        transaction_id: Joi.string().regex(MONGO_OBJECT_ID_REGX).required().messages({
            'string.pattern.base': 'invalid transaction_id',
        }), 
    });

    // Validate transaction ID
    const { error } = schema.validate(req.query);
    if (error) throw new ApiError(HTTP_STATUS_CODES.BAD_REQUEST, error.message);

    // Get the first and last day of the current month
    const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const endOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);

    // Find the transaction and ensure it's within the current month
    const transaction = await TransactionModal.findOne({
        _id: new Mongoose.Types.ObjectId(req.query.transaction_id),
        user: req.user._id,
        transactionDate: { $gte: startOfMonth, $lte: endOfMonth }
    });

    if (!transaction) {
        throw new ApiError(HTTP_STATUS_CODES.NOT_FOUND, "No transaction found with the given transaction ID or transaction is not within the current month");
    }

    // Delete the transaction
    await TransactionModal.findOneAndDelete({
        _id: transaction._id,
        user: req.user._id
    });

    return res.status(HTTP_STATUS_CODES.OK).json(new ApiResponse(HTTP_STATUS_CODES.OK, req.query.transaction_id, "Transaction deleted successfully"));
});

//update transaction

//get all transactions by month, date, category and sort order
const getAllTransactions = asyncHandler(async(req, res)=>{
    const schema = Joi.object({
        month: Joi.date().required(),
        filterBy: Joi.string().valid(...filterByValues),
        sortBy: Joi.string().valid(...sortByValues),
        category: Joi.string().min(3),
        selected_date: Joi.date()

    })

    const {error} = schema.validate(req.body)
    if(error){
        throw new ApiError(HTTP_STATUS_CODES.BAD_REQUEST, error.message)
    }

    // const result = 


})
 
export {
    addTransaction,
    getTransactionInfo,
    deleteTransaction
}