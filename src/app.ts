import "reflect-metadata";
import { useExpressServer } from "routing-controllers";
import { UserController } from "./controllers/user.controller";
import express from "express";

//update to  userExpressServer
const route = express();

export const app = useExpressServer(route, {
  controllers: [UserController],
});
