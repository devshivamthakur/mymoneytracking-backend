import { Router } from "express";
import { addTransaction, deleteTransaction, getAllTransactions, getTransactionInfo } from "../controllers/transaction.controller.js";
const router = Router()

router.post("/add", addTransaction)
router.get("/info", getTransactionInfo)
router.delete("/delete", deleteTransaction)
router.post("/filter", getAllTransactions)


export {
    router as TransactionRoutes
}