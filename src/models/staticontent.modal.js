import mongoose from "mongoose"
const schema = new mongoose.Schema({
    staticContentType: {
        type: String,
        required: true
    },
    contentData:{
        type: String,
        required: true
    }
})

export const staticContentModal =  mongoose.model('staticcontentmodal', schema)