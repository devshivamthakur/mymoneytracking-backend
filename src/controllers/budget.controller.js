import Joi from "joi";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { BudgetModal } from "../models/budget.modal.js";
import Mongoose from "mongoose";
import { ApiResponse } from "../utils/ApiResponse.js";
import { HTTP_STATUS_CODES } from "../utils/ErrorConstant.js";

const createBudget = asyncHandler(async (req, res, next) => {
    //validate the parameters
    const schema = Joi.object({
        month: Joi.date().required(),
        budgetAmount: Joi.number().required().min(1),
    })
    const { error } = schema.validate(req.body)
    if (error) {
        throw new ApiError(HTTP_STATUS_CODES.BAD_REQUEST, error.message)
    }
    const month = new Date(req.body.month).getMonth()
    const year = new Date(req.body.month).getFullYear()


    const result = await BudgetModal.aggregate([
        // 1st stage to filter based on user and date
        {
            $match: {
                $expr: {
                    $and: [
                        {
                            $eq: ["$user", new Mongoose.Types.ObjectId(req.user._id)]
                        },
                        {
                            $eq: [{ $month: "$month" }, month + 1] // Use $month to extract the month
                        },
                        {
                            $eq: [{ $year: "$month" }, year] // Use $year to extract the year
                        }
                    ]
                }
            }
        }
    ]);



    if (result.length > 0) {
        throw new ApiError(HTTP_STATUS_CODES.CONFLICT, "Budget for the given time period already exists")
    }

    const createBudget = await BudgetModal.create({
        budgetAmount: req.body.budgetAmount,
        month: req.body.month,
        spendAmount: 0,
        user: new Mongoose.Types.ObjectId(req.user._id)
    })

    if (!createBudget.id) throw new ApiError(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, "unable to create budget")

    return res.status(HTTP_STATUS_CODES.OK).json(new ApiResponse(HTTP_STATUS_CODES.OK, createBudget.id, "budget created successfully"))

})

/*
get budget info based on budget id or given month
*/
const getBudgetInfo = asyncHandler(async (req, res) => {
    const schema = Joi.object({
        month: Joi.string()
            .pattern(/^\d{4}-(0[0-9]|1[0-2])$/, 'yyyy-mm')
            .messages({
                'string.pattern.base': 'Month must be in yyyy-mm format',
            }),

        budget_id: Joi.string().regex(/^[0-9a-fA-F]{24}$/)
    })
        .or('month', 'budget_id') // Ensures at least one of the two fields is required
        .messages({
            'object.missing': 'At least one of month, budget_id must be provided' // Custom error message
        });

    const { error } = schema.validate(req.query)
    if (error) throw new ApiError(HTTP_STATUS_CODES.BAD_REQUEST, error.details[0].message)

    let [year = "", month = ""] = ["", ""]
    if (req.query.month) {
        [year, month] = req.query?.month?.split("-")
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set the time to the start of the day
    
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1); // Set to the start of the next day

    const result = await BudgetModal.aggregate([
        {
            $match: {
                $expr: {
                    $and: [
                        { $eq: ["$user", new Mongoose.Types.ObjectId(req.user._id)] },
                        {
                            $or: [
                                {
                                    $and: [
                                        { $eq: [{ $month: "$month" }, Number(month)] },
                                        { $eq: [{ $year: "$month" }, Number(year)] }
                                    ]
                                },
                                { $eq: ["$_id", new Mongoose.Types.ObjectId(req.query?.budget_id)] }
                            ]
                        }
                    ]
                }
            }
        },
        {
            $lookup: {
                from: "transactions",
                localField: "_id",
                foreignField: "budget",
                pipeline: [
                    {
                        $match: {
                            transactionDate: {
                                $gte: today,
                                $lt: tomorrow
                            }
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
                ],
                as: "todays_transaction"
            }
        },
        {
            $project:{
                createdAt: 0,
                updatedAt: 0,
                user: 0
            }
        }
    ]);


    if (result.length == 0) throw new ApiError(HTTP_STATUS_CODES.NOT_FOUND, "no budget found for given request")

    return res.status(HTTP_STATUS_CODES.OK).json(new ApiResponse(HTTP_STATUS_CODES.OK, result[0], "budget found successfully"))

})


export {
    createBudget,
    getBudgetInfo
}