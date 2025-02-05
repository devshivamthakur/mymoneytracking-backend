import { imagekit } from "../db/ImageKitConnection.js";
import { UserModal } from "../models/user.modal.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { HTTP_STATUS_CODES } from "../utils/ErrorConstant.js";

export const uploadFile = asyncHandler(async (req, res, next) => {

    const { originalname } = req.file;

    const fileName = generateFileName(originalname);

    const result = await imagekit.upload({
        file: req.file.buffer.toString('base64'),
        fileName: fileName,
        tags: ['profile'],
        folder: '/profile',
        isPublished: true,

    })

    console.log(req.user)
    const user = await UserModal.findById(req.user._id);
    user.profileUrl = result.filePath;
    await user.save();
    return res.status(HTTP_STATUS_CODES.OK).json(new ApiResponse(HTTP_STATUS_CODES.OK,
        {
            fileName: fileName,
            url: `${process.env.IMAGEKIT_URL_ENDPOINT}${result.filePath}`
        }, "File uploaded successfully."));

})

const generateFileName = (originalname) => {
    const randomString = new Date().getTime().toString(36);
    if(!originalname){
        return `${randomString}.png`;
    }
    const fileExt = originalname.split('.').pop();
    const fileName = originalname.split('.').slice(0, -1).join('.').replace(/[^a-z0-9]/gi, '_').toLowerCase();
    return `${fileName}-${randomString}.${fileExt}`;

}