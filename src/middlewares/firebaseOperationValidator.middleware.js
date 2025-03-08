import Joi from "joi"
import { HTTP_STATUS_CODES } from "../utils/ErrorConstant.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"

export const validateLoadVersionViseOtherServices = asyncHandler(async (req, _, next) => {
    // const {appVersion, services} = req.body

    const schema = Joi.object({
        appVersion: Joi.string().required(),
        services: Joi.array().items({
            name: Joi.string().required(),
            type: Joi.string().required(),
            image: Joi.string().required(),
            url: Joi.string().optional(),
            id: Joi.string().optional()
        }).required()
    })
    const { error } = schema.validate(req.body)
    if (error) throw new ApiError(HTTP_STATUS_CODES.BAD_REQUEST, error.message)
    next()
})

export const validateLoadVersionViseTopQuickService = asyncHandler(async (req, _, next) => {
    // const {appVersion, services} = req.body

    const schema = Joi.object({
        appVersion: Joi.string().required(),
        services: Joi.array().items({
            title: Joi.string().required(),
            screenName: Joi.string().required(),
            icon: Joi.string().required(),
            order: Joi.number().optional(),
            id: Joi.string().optional()
        }).required()
    })
    const { error } = schema.validate(req.body)
    if (error) throw new ApiError(HTTP_STATUS_CODES.BAD_REQUEST, error.message)
    next()
})