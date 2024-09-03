import mongoose from "mongoose";

const schema = new mongoose.Schema({
    color: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    short_name: {
        type: String,
        required: true
    },
},{
    timestamps: true,
})

export const CategoryModal = mongoose.model("category", schema)
