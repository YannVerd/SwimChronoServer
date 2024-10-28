import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";
import config from './auth.config.ts';



export const generateAccessToken = (userId: string) => {
  const payload = {
    userId: userId,
  };

  return jwt.sign(payload, config.secret, {expiresIn: '1 days'}); 
};

export interface CustomRequest extends Request {
  token: string | JwtPayload;
 }
export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
 
    if (!token) {
      throw new Error("No token provided");
    }
 
    const decoded = jwt.verify(token, config.secret);
    (req as CustomRequest).token = decoded;
 
    next();
  } catch (err) {
    res.status(401).json({message: "please authenticate"});
  }
 };