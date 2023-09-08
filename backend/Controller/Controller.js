import UserModel from "../Model/Model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendActivationEmail } from "../Utils/helper.js";

export const registerUser = async (req, res) => {
    const { email, firstName, lastName, password } = req.body;

    try {
        const emailCheck = await UserModel.findOne({ email: email });
        if (emailCheck) {
            res.status(404).json({ message: "Email ID already exists" });
            return;
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const activationToken = jwt.sign(
            { email: email },
            process.env.ACTIVATION_SECRET,
            { expiresIn: "1d" }
        );
        const newUser = new UserModel({
            email: email,
            firstName: firstName,
            lastName: lastName,
            password: hashedPassword,
            activationToken: activationToken,
        });
        await newUser.save();
        const activationLink = `${process.env.CLIENT_URL}/activate?token=${activationToken}`;
        sendActivationEmail(email, activationLink);
        res.status(200).json(newUser);
    } catch (error) {
        res.status(404).json({ message:  "Registration Error"+error });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    res.setHeader('Content-Type', 'application/json');
    try {
        const user = await UserModel.findOne({ email: email });
        if (!user) {
                res.status(404).json({ message: "User does not exist" });
                return
        }
        if (!user.isActivated){
                res.status(403).json({ message: "Account not activated. Please verify your account.",});
                return
        }
        const passwordValidation = await bcrypt.compare(password,user.password);
        if (!passwordValidation) {
                res.status(404).json({ message: "Password is incorrect" });
                return
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: "Error" + error });
    }
};

export const activateAccount = async (req, res) => {
    const { token } = req.query;
    try {
        const decodedToken = jwt.verify(token, process.env.ACTIVATION_SECRET);
        const { email } = decodedToken;
        await UserModel.findOneAndUpdate( { email }, { isActivated: true }, { new: true });
        res.status(200).json({ message: "Account activated successfully" });
    } catch (error) {
        res.status(400).json({ message: "Invalid activation token" });
    }
};

export const getShortUrl = async (req, res) => {
        const {id} = req.params
    const { full } = req.body;
    try {
        const userDocument = await UserModel.findOne({ _id: id });
        const newUrl = {full:full}
        userDocument.url.push(newUrl)
        await userDocument.save()
        res.status(200).json(userDocument.url);
    } catch (error) {
        res.status(404).json({ message: "Error" + error });
    }
};

export const getAllUrls = async(req,res) => {
        try {
                const {id} = req.params
                const userDocument = await UserModel.findOne({ _id: id });
                res.status(200).json(userDocument.url)
        } catch (error) {
                res.status(404).json({ message: "Error" + error });                
        }
}
export const redirectShortUrl = async(req,res) => {
        try {
                const {id} = req.params
                const {shortUrl} = req.query
                const userDocument = await UserModel.findOne({ _id: id });
                if(!userDocument)return res.status(404).json({message:"User not found"})
                const urlMatch = userDocument.url.find((url) => url.short === shortUrl);
                if (!urlMatch) return res.status(404).json({ message: "URL not found" });
                urlMatch.clicks++;
                await userDocument.save();
                res.status(200).json(urlMatch.full);
        } catch (error) {
                res.status(404).json({ message: "Error" + error });                
        }
}