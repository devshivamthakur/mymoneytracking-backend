import {Schema, model} from "mongoose"

const schema = new Schema ({
   name:{
    type:String,
    required: true
   },
   email:{
    type:String,
    required: true,
    unique: true
   },
   googleId:{
    type:String,
    required: true,
    unique: true
   },
   profileUrl:String,
   deviceId:String,
},{
    timestamps:true,
})

export const UserModal = model("user", schema)
