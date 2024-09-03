import mongoose from "mongoose";

const schema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,

    },
    transactionDate: Date,
    category: {
        type: mongoose.Types.ObjectId,
        ref: "category"
    },
    discrption: String,
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

export  const TransactionModal = mongoose.model('transaction', schema)