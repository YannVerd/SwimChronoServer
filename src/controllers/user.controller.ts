import { Request, Response } from "express";
import mongoose, { MongooseError } from "mongoose";

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
    user.find({email: req.body.email}, (err: MongooseError, doc: any)=>{
        if(err){
            console.error(err);
            res.status(404).json({message: "Wrong email. No user found"})
        }
        else{
            user.password = doc.password;
            if(user.validPassword(req.body.password)){
                res.status(200).json({username: doc.username, email: doc.email})
            }else{
                res.status(404).json({message: "Wrong password. Please retry"})
            }
        }
    })
    
}