import { Router } from "express";
import { deleteAllUserHavingEmptyId, showAllUser } from "../controllers/firebaseOperation.controller.js"
const router = Router()

router.get("/user", showAllUser)
router.delete("/deleteAllUserHavingEmptyId", deleteAllUserHavingEmptyId)
export {
    router as firebaseRoutes
}