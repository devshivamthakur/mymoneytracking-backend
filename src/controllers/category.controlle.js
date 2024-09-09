import { CategoryModal } from "../models/category.modal.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { HTTP_STATUS_CODES } from "../utils/ErrorConstant.js";

//get all categories
const getCategories = asyncHandler(async(req, res)=>{
    
    const result = await CategoryModal.find({})
    
    return res.status(HTTP_STATUS_CODES.OK).json(new ApiResponse(HTTP_STATUS_CODES.OK, result, "category found successfully."))

})

export {
    getCategories
}