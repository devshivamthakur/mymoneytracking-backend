import { ApiError } from "../utils/ApiError.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import joi from "joi"
import { HTTP_STATUS_CODES } from "../utils/ErrorConstant.js";

export const uploadValidator = asyncHandler(async (req, _, next) => {

    if (!req.file) {
        throw new ApiError(HTTP_STATUS_CODES.BAD_REQUEST, 'Please upload a file');
    }

    const { mimetype, size } = req.file;

    //accept only images and size less than 1MB
    if (mimetype !== 'image/jpeg' && mimetype !== 'image/png' && mimetype !== 'image/jpg' && mimetype !== 'image/gif') {
        throw new ApiError(HTTP_STATUS_CODES.BAD_REQUEST, 'Please upload a valid image file');
    }

    if(size > 1000000){
        throw new ApiError(HTTP_STATUS_CODES.BAD_REQUEST, 'Please upload a file less than 1MB');
    }
    //here we check the file and user name
    const schema = joi.object({
        name: joi.string().optional,
    })

    const { error } = schema.validate(req.body)
    if (error) {
        throw new ApiError(400, error?.message)
    }
    next()
})