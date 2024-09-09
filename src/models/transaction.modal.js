import mongoose from "mongoose";
import { BudgetModal } from "./budget.modal.js";

const schema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,

    },
    transactionDate: {
        type: Date,
        required: true,
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: "category"
    },
    description: String,
    budget: {
        type: mongoose.Types.ObjectId,
        ref:"budget"
    },
    user:{
        type: mongoose.Types.ObjectId,
        ref:"user"
    }
}, {
    timestamps: true,
})

// Post middleware to run after a transaction is deleted
schema.post('findOneAndDelete', async function(doc) {
    if (doc) {
        console.log('Deleted transaction:', doc);

        const budgetInfo = await BudgetModal.findById(doc.budget)
        const finalSpend = (budgetInfo.spendAmount || 0) - doc.amount
        budgetInfo.spendAmount = Math.max(finalSpend, 0)
        budgetInfo.save()
        // Perform any additional logic here, such as logging or triggering another action
    }
});

export  const TransactionModal = mongoose.model('transaction', schema)