import "reflect-metadata";
import { createExpressServer, useContainer as routingControllersUseContainer } from "routing-controllers";
import { createConnection } from "typeorm";
import { UserController } from "./controllers/user.controller";

// createConnection("default")
//   .then(() => {
    // routingControllersUseContainer(Container);


    //update to  user express 
    const app = createExpressServer({
      controllers: [UserController],
    });

    
    // app.listen(3005, () => {
    //   console.log("Server is running on port 3005");
    // });
  // })
  
  // .catch((error) => console.log("Error connecting to the database:", error));

