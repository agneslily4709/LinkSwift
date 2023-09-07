import mongoose from "mongoose";
import shortid from "shortid"

const userSchema = mongoose.Schema({
        email:{
                type:String,
                required:true,
                unique:true
        },
        firstName:{
                type:String,
                required:true,
        },
        lastName:{
                type:String,
                required:true,
        },
        password:{
                type:String,
                required:true,
        },
        activationToken:{
                type:String,
                required:true
        },
        isActivated:{
                type:Boolean,
                default:false
        },
        createdAt:{
                type:Date,
                default:new Date()
        },
        url:[{
                full:{
                        type:   String,
                        required:true
                   },
                   short:{
                        type:   String,
                        default:shortid.generate,
                   },
                   clicks:{
                        type:   Number,
                        default:0,
                   },
        }]
})

const UserModel = mongoose.model("Users",userSchema)
export default UserModel