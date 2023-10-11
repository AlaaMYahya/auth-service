import { User } from "../entities/user.entity";
import {
  //  CreateUserDto,
   UpdatUserDto } from "../dto/createUserDto";
import { AppDataSource } from "../config/data-source";
import bcrypt from "bcrypt";


class UserService {
  userRepository = AppDataSource.getRepository(User);

  async hashPassword (password : string): Promise<string>{
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getUserById(
    id: number, //  : Promise<User | undefined>
  ) {
    const user = await this.userRepository.findOne({ where: { id } });
    return user;
  }

  async createUser(username: string, email: string, password:string, bio:string): Promise<User> {
    const user = new User();
    user.username = username;
    user.email = email;
    user.password = password;
    user.bio = bio;
    return this.userRepository.save(user);
  }

  async updateUser(
    id: number,
    updatedUser: UpdatUserDto,
  ): Promise<User | undefined> {
    const user = await this.userRepository.save({ id, ...updatedUser });
    return user;
  }

  async deleteUser(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}

export const userService = new UserService();
