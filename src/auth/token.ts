import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";
import config from './auth.config.ts';
import { UserDTO } from '../dtos/UserDTO.ts';

export const generateAccessToken = (user: UserDTO) => {
  const payload = {
    userId: user.userId,
    userName: user.username,
    email: user.email
  };

  return jwt.sign(payload, config.secret, {expiresIn: '1d'}); 
};

export interface CustomRequest extends Request {
  token: string | JwtPayload;
 }

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    console.log(token)
 
    if (!token) {
      throw new Error("No token provided, please authenticate");
    }
 
    const decoded = jwt.verify(token, config.secret);
    req.body.token = decoded;
 
    next();
  } catch (err) {
    res.status(401).json({message: `Token ${err}`});
  }
 };