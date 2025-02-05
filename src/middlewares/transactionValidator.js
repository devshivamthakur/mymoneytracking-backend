import Joi from "joi";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { HTTP_STATUS_CODES } from "../utils/ErrorConstant.js";
import { filterByValues, MONGO_OBJECT_ID_REGX, sortByValues } from "../utils/constants.js";

export const addTransactionValidator = asyncHandler(async (req, _, next) => {
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

    next()
})

export const getTransactionInfoValidator = asyncHandler(async (req, _, next) => {
    const schema = Joi.object({
        transaction_id: Joi.string().regex(MONGO_OBJECT_ID_REGX).required().messages({
            'string.pattern.base': 'invalid transaction_id',
        }),
    })

    //validate transaction id
    const { error } = schema.validate(req.query)
    if (error) throw new ApiError(HTTP_STATUS_CODES.BAD_REQUEST, error.message)
    next()
})

export const deleteTransactionValidator = asyncHandler(async (req, _, next) => {
    const schema = Joi.object({
        transaction_id: Joi.string().regex(MONGO_OBJECT_ID_REGX).required().messages({
            'string.pattern.base': 'invalid transaction_id',
        }),
    });

    // Validate transaction ID
    const { error } = schema.validate(req.query);
    if (error) throw new ApiError(HTTP_STATUS_CODES.BAD_REQUEST, error.message);
    next();
})

export const getAllTransactionsValidator = asyncHandler(async (req, _, next) => {
    const schema = Joi.object({
        month: Joi.string()
            .pattern(/^\d{4}-(0[1-9]|1[0-2])$/, 'yyyy-mm')
            .messages({ 'string.pattern.base': 'Month must be in yyyy-mm format' })
            .required(),
        filterBy: Joi.string().valid(...filterByValues),
        sortBy: Joi.string().valid(...sortByValues),
        category_id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).messages({
            'string.pattern.base': 'Provide a valid category ID',
        }),
        selected_date: Joi.date(),
        limit: Joi.number().default(10),
        offset: Joi.number().default(1),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        throw new ApiError(HTTP_STATUS_CODES.BAD_REQUEST, error.message);
    }

    next();
})