import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Joi from "joi";
import { HTTP_STATUS_CODES } from "../utils/ErrorConstant.js";

export const createBudgetValidator = asyncHandler(async (req, _, next) => {
    //validate the parameters
    const schema = Joi.object({
        month: Joi.date().required(),
        budgetAmount: Joi.number().required().min(1),
    })
    const { error } = schema.validate(req.body)
    if (error) {
        throw new ApiError(HTTP_STATUS_CODES.BAD_REQUEST, error.message)
    }
    next()
})

export const getBudgetInfoValidator = asyncHandler(async (req, _, next) => {
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
    next()
})