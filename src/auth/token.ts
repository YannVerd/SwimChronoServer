import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";
import config from './auth.config.ts';
import { UserDTO } from '../dtos/UserDTO.ts';

import crypto from 'crypto';

export const generateAccessToken = (user: UserDTO) => {
  const xsrfToken = crypto.randomBytes(64).toString('hex')
  const payload = {
    userId: user.userId,
    userName: user.username,
    email: user.email,
    xsrfToken
  }

  const token = jwt.sign(payload, config.secret, {expiresIn: '1d'})

  return {token, xsrfToken}; 
};

export interface CustomRequest extends Request {
  xsrfToken: string | JwtPayload;
 }

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.cookies || !req.cookies.accessToken) {
      throw new Error("Missing token in cookie");
    }
    const accessToken = req.cookies.accessToken;

    const token = req.header('Authorization')?.replace('Bearer ', '');
   
    if (!token) {
      throw new Error("No token provided, please authenticate");
    }
 
    const decoded = jwt.verify(token, config.secret) as JwtPayload;
   
    if(accessToken !== decoded.xsrfToken){
      throw new Error("Bad xsrf token")
    }
    
    req.body.token = decoded;
 
    next();
  } catch (err) {
    res.status(401).json({message: `Token ${err}`});
  }
 };