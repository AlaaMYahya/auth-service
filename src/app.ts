import "reflect-metadata";
import { useExpressServer } from "routing-controllers";
import express from "express";
import path from "path";


const route = express();

export const app = useExpressServer(route, {
  cors: true,
  controllers: [path.join(__dirname + './controllers/*.js')],
});
