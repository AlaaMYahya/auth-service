"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const user_controller_1 = require("./controllers/user.controller");
//update to  user express 
exports.app = (0, routing_controllers_1.createExpressServer)({
    controllers: [user_controller_1.UserController],
});
