"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
// import { Inject, Service } from "typedi";
// import { InjectRepository } from "typeorm-typedi-extensions";
// import { UserRepository } from "../repositories/user.repository";
const user_entity_1 = require("../entities/user.entity");
const data_source_1 = require("../config/data-source");
// @Service()
// export 
class UserService {
    constructor() {
        this.userRepository = data_source_1.AppDataSource.getRepository(user_entity_1.User);
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository.find();
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOne({ where: { id } });
            return user;
        });
    }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository.save(user);
        });
    }
    updateUser(id, updatedUser) {
        return __awaiter(this, void 0, void 0, function* () {
            // Partial<User>
            const user = yield this.userRepository.save(Object.assign({ id }, updatedUser));
            return user;
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userRepository.delete(id);
        });
    }
}
exports.userService = new UserService();
