import Joi from "joi";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { HTTP_STATUS_CODES } from "../utils/ErrorConstant.js";

export const getStaticContentValidator = asyncHandler(async (req, res, next) => {
    const schema = Joi.object({
        type: Joi.string().required(),
    })

    const { error } = schema.validate(req.query)
    if (error) {
        throw new ApiError(HTTP_STATUS_CODES.BAD_REQUEST, error.message)
    }
    next()
});