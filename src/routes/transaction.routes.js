import { Router } from "express";
import { addTransaction, deleteTransaction, getTransactionInfo } from "../controllers/transaction.controller.js";
const router = Router()

router.post("/add", addTransaction)
router.get("/info", getTransactionInfo)
router.delete("/delete", deleteTransaction)


export {
    router as TransactionRoutes
}