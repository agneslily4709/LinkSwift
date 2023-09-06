import UserModel from "../Model/Model.js";
import bcrypt from "bcrypt"

export const createUser = async(req,res) => {
        const {email,firstName,lastName,password} = req.body
        try {
                const emailCheck = await UserModel.findOne({email:email})
                if(emailCheck) res.status(404).json({message:"Email ID already exists"})
                const hashedPassword = bcrypt.hash(password,10)
                const newUser = new UserModel({email:email,firstName:firstName,lastName:lastName,password:hashedPassword})
                await newUser.save()
                res.status(200).json(newUser)
        } catch (error) {
                res.status(404).json({message:"Error"+error})
        }
}