import "reflect-metadata";
import { createExpressServer, useContainer as routingControllersUseContainer } from "routing-controllers";
import { createConnection } from "typeorm";
import { UserController } from "./controllers/user.controller";

    //update to  user express 
  export const app = createExpressServer({
    controllers: [UserController],
  });

