import { Router } from "express";
import { deleteAllUserHavingEmptyId, getAllOtherServices, loadVersionViseOtherServices, showAllUser } from "../controllers/firebaseOperation.controller.js"
import { validateLoadVersionViseOtherServices } from "../middlewares/firebaseOperationValidator.middleware.js";
const router = Router()

router.get("/user", showAllUser)
router.delete("/deleteAllUserHavingEmptyId", deleteAllUserHavingEmptyId)
router.get("/otherServices", getAllOtherServices)
router.post("/load-version-otherservice", validateLoadVersionViseOtherServices, loadVersionViseOtherServices)

export {
    router as firebaseRoutes
}