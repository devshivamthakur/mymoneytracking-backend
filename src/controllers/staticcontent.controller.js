import Joi from "joi";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { HTTP_STATUS_CODES } from "../utils/ErrorConstant.js";
import { staticContentModal } from "../models/staticontent.modal.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const getStaticContent = asyncHandler(async (req, res) => {

    const result = await staticContentModal.findOne({
        staticContentType: req.query.type
    })

    return res.status(200).json(new ApiResponse(HTTP_STATUS_CODES.OK, result, "static content found successfully"))
})

export {
    getStaticContent
}