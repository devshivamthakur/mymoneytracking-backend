
import { Router } from "express";
import userRoutes from './user.routes.js';
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { BudgetRoutes } from "./budget.routes.js";
import { getCategories } from "../controllers/category.controlle.js";
import { TransactionRoutes } from "./transaction.routes.js";

const router = Router()


router.use('/api/v1/users', userRoutes);

//secure routes
router.use("/api/v1/budget", verifyJwt, BudgetRoutes)
router.get("/api/v1/category", verifyJwt, getCategories)
router.use("/api/v1/transaction", verifyJwt, TransactionRoutes)


export {
    router as IndexRouter
}
