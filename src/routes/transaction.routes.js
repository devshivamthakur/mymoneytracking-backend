import { Router } from "express";
import { addTransaction, deleteTransaction, getAllTransactions, getTransactionInfo } from "../controllers/transaction.controller.js";
import { addTransactionValidator, deleteTransactionValidator, getAllTransactionsValidator, getTransactionInfoValidator } from "../middlewares/transactionValidator.js";
const router = Router()

router.post("/add", addTransactionValidator,addTransaction)
router.get("/info", getTransactionInfoValidator, getTransactionInfo)
router.delete("/delete", deleteTransactionValidator, deleteTransaction)
router.post("/filter", getAllTransactionsValidator, getAllTransactions)


export {
    router as TransactionRoutes
}