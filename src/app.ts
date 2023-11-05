import "reflect-metadata";
import { useExpressServer, Action } from "routing-controllers";
import { ErrorHandler } from "./middlewares/ErrorHandler";
import express from "express";
import path from "path";

import jwt from "jsonwebtoken";
import { config } from "./config/config";

export const route = express();


export const app = useExpressServer(route, {
  development: false,
  defaultErrorHandler: false,
  middlewares: [ErrorHandler],
  cors: true,
  controllers: [path.join(__dirname + './controllers/*.js')],

  authorizationChecker: async (action: Action): Promise<boolean> => {
    try{
      const authHeader = action.request.headers['authorization']; 
      if (!authHeader) {
        return false; 
      }
      
      const token = authHeader.split(' ')[1]; 
      const secret = config.jwtSecret || 'secret';
      const decoded = jwt.verify(token, secret);
      
      if(decoded){
      return true; 
      }
    } catch (error) {
       return false; 
      } },
 
});
