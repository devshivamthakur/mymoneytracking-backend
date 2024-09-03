import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import joi from "joi"

const loginUser = asyncHandler(async (req, res) => {
    const schema = joi.object({
        name: joi.string().required().min(3).max(14),
        email: joi.string().email().required(),
        googleId: joi.string().required(),
    })

    const {error}  = schema.validate(req.body)
    if(error) {
        throw new ApiError(400, error?.message)
    }

    

})

export {
    loginUser,
}