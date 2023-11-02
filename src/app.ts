import "reflect-metadata";
import { useExpressServer, Action, UnauthorizedError } from "routing-controllers";
import { ErrorHandler } from "./middlewares/ErrorHandler";
import express from "express";
import path from "path";


const route = express();

export const app = useExpressServer(route, {
  development: false,
  defaultErrorHandler: false,
  middlewares: [ErrorHandler],
  cors: true,
  controllers: [path.join(__dirname + './controllers/*.js')],
  authorizationChecker: async (action: Action, roles: string[]) => {
    throw new UnauthorizedError( " You are not authrized");
    // return false;
  },
  
});
