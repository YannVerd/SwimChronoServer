import jwt from 'jsonwebtoken';
import { Request, Response } from "express";
import config from './auth.config.ts';
import { JsonWebTokenError } from 'jsonwebtoken';
import { isNamedExportBindings, resolveTypeReferenceDirective } from 'typescript';


export const generateAccessToken = (userId: string, username: string) => {
  const payload = {
    userId: userId,
    username: username
  };

  return jwt.sign(payload, config.secret, {}); // no expiration date
};


export const verifyToken = (req: { userId: null; sessionId: any, body:  {username: string} }, res: Response, next: () => any) => {
  const token = req.sessionId;

  if (!token) {
    return res.status(403).send({ message: 'No token provided!' });
  }

  jwt.verify(token, config.secret, (err: JsonWebTokenError, decoded: {userId: string, username: string}) => {
    if (err || !decoded) {
      return next();
    }

    req.body.username = decoded.username;

    return next();
  });
};