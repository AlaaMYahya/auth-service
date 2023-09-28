"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const typeorm_1 = require("typeorm");
const user_controller_1 = require("./controllers/user.controller");
(0, typeorm_1.createConnection)("default")
    .then(() => {
    // routingControllersUseContainer(Container);
    const app = (0, routing_controllers_1.createExpressServer)({
        controllers: [user_controller_1.UserController],
    });
    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    });
})
    .catch((error) => console.log("Error connecting to the database:", error));
//   .catch((error) => console.logSorry, it seems that the code got cut off. Here's the continuation:
