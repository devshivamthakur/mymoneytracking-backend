import jwt from "jsonwebtoken"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { UserModal } from "../models/user.modal.js"

export const verifyJwt = asyncHandler(async (req, _, next) => {
    try {
        const token = req?.header("Authorization")?.replace("Bearer ", "")
        if (!token) throw new ApiError(401, "Unauthorized request")

        const userMetaInfo = await jwt.verify(token, process.env.JWT_ACCESS_TOKEN)

        const user = await UserModal.findById(userMetaInfo?._id)
        if (!user) throw new ApiError(401, "invalid user token")

        req.user = user
        next()
    } catch (error) {
        throw new ApiError(500, error?.message || "server error")
    }
})