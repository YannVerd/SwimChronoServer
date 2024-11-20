import { Request, Response } from "express";
import mongoose from "mongoose";
import { CustomRequest, generateAccessToken } from "../auth/token";


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
                    const {token, xsrfToken} = generateAccessToken(doc)
                    res.cookie('accessToken', xsrfToken,
                        {
                            httpOnly: true,
                            maxAge: 86400000 //one day
                            // add secure: true for production
                        }
                    )
                    res.status(200).json({user: {username: doc.username, email: doc.email, id: doc._id.toString()}, token})
                }else{
                    res.status(404).json({message: "Wrong password. Please retry"})
                }
            }else{
                res.status(404).json({message: "No user was found with this email address"})
            }  
            
        })
        .catch(err => {
            console.error(err)
            res.status(404).json({message: "Wrong email. No user found"})
        })
}

export const authUser = async (req: Request, res: Response) => {
    res.status(200).json({token: req.body.token})
}
export const logout = async (req: Request, res: Response) => {
    console.log("bou")
    try{
        res.clearCookie('accessToken', {
            httpOnly: true,
            secure: true, 
        }) 
        console.log('Cookies after clear:', req.cookies);
        res.status(200).json({ message: 'Logged out successfully' });
    }
    catch(err){
        console.error('clear user cookie', err)
        res.status(404).json({message: "Clear cookie failed"})
    }
}