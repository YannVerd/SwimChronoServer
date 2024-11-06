import { Request, Response } from "express";
import mongoose, { MongooseError } from "mongoose";
import { generateAccessToken } from "../auth/token";


const User = mongoose.model('User')

export const registerUser = async (req: Request, res: Response) => {
    const user = new User();
    
    user.sessionId = req.body?.sessionId;
    user.username = req.body.username;
    user.email = req.body.email;
    user.password = await user.generateHash(req.body.password);

    user.save()
        .then(()=> {
            res.status(200).json({message: `${req.body.username} has been succesfully registered`})
        })
        .catch((err: any)=> {
            console.error(err)
            res.status(400).json({message: "failed to register user in database"})
        })
}

export const loginUser = async (req: Request, res: Response ) => {
    const user = new User();
    User.findOne({email: req.body.email})
        .then(doc => {
            if(doc){
                user.password = doc.password
                if(user.validPassword(req.body.password)){
                    const token = generateAccessToken(doc.userId)
                    res.status(200).json({user: {username: doc.username, email: doc.email, id: doc._id.toString()}, token: token})
                }else{
                    res.status(404).json({message: "Wrong password. Please retry"})
                }
            }else{
                res.status(404).json({message: "No user was found with this email address"})
            }  
            
        })
        .catch(err => {
            res.status(404).json({message: "Wrong email. No user found"})
        })
}