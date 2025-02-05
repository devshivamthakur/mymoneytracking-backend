import { ApiError } from "../utils/ApiError.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import joi from "joi"

export const loginValidator = asyncHandler(async (req, _, next) => {
    const schema = joi.object({
        name: joi.string().required().min(3).max(14),
        email: joi.string().email().required(),
        googleId: joi.string().required(),
        profileUrl: joi.string(),
        deviceId: joi.string()
    })

    const { error } = schema.validate(req.body)
    if (error) {
        throw new ApiError(400, error?.message)
    }
    next()
})