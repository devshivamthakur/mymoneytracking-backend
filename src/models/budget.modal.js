import mongoose, { Schema, model } from "mongoose";

const schema = new Schema({
    user:{
        type: mongoose.Types.ObjectId,
        ref:"user",
        required: true
    },
    month: {
        type: Date,
        required: true
    },
    budgetAmount:{
        type: Number,
        required: true
    },
    spendAmount: Number

},{
    timestamps: true
})

export const BudgetModal = model("budget",schema)
