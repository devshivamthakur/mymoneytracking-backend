import {Schema, model} from "mongoose"
import jwt from "jsonwebtoken"

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

schema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            googleId: this.googleId,
        },
        process.env.JWT_ACCESS_TOKEN
    )
}

export const UserModal = model("user", schema)

