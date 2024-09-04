import { UserModal } from "../models/user.modal.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import joi from "joi"

const loginUser = asyncHandler(async (req, res) => {
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

    let user = await UserModal.findOne({    
        email: req.body.email
    })

    if (user) {
        return res.status(200).json(new ApiResponse(200, {user, accessToken : user.generateAccessToken()}, "user logged in successfully."))

    }

    user = await UserModal.create({
        email: req.body.email,
        name: req.body.name,
        googleId: req.body.googleId,
        profileUrl: req.body.profileUrl || "",
        deviceId: req.body.deviceId || "",
    })

    user.accessToken = user.generateAccessToken()

    return res.status(200).json(new ApiResponse(200, user.toJSON(), "user logged in successfully"))


})

export {
    loginUser,
}