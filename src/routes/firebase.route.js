import { Router } from "express";
import { deleteAllUserHavingEmptyId, deletePastYearBudgetData, getAllOtherServices, getAllTopQuickServices, loadVersionViseOtherServices, loadVersionVisetopQuick, showAllUser } from "../controllers/firebaseOperation.controller.js"
import { validateLoadVersionViseOtherServices, validateLoadVersionViseTopQuickService } from "../middlewares/firebaseOperationValidator.middleware.js";
const router = Router()

router.get("/user", showAllUser)
router.delete("/deleteAllUserHavingEmptyId", deleteAllUserHavingEmptyId)
router.get("/otherServices", getAllOtherServices)
router.post("/load-version-otherservice", validateLoadVersionViseOtherServices, loadVersionViseOtherServices)
router.get("/topQuickServices", getAllTopQuickServices)
router.post("/load-version-topQuickServices", validateLoadVersionViseTopQuickService, loadVersionVisetopQuick)
router.delete("/deletePastYearBudgetData", deletePastYearBudgetData)


export {
    router as firebaseRoutes
}