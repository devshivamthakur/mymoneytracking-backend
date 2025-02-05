import { Router } from "express";
import {createBudget, getBudgetInfo} from "../controllers/budget.controller.js"
import { createBudgetValidator, getBudgetInfoValidator } from "../middlewares/budgetValidator.js";
const router = Router()

router.post("/create", createBudgetValidator, createBudget)
router.get("/info", getBudgetInfoValidator, getBudgetInfo)

export {
    router as BudgetRoutes
}