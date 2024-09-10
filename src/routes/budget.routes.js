import { Router } from "express";
import {createBudget, getBudgetInfo} from "../controllers/budget.controller.js"
const router = Router()

router.post("/create", createBudget)
router.get("/info", getBudgetInfo)

export {
    router as BudgetRoutes
}