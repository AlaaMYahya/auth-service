import { User } from "../entities/user.entity";
import { CreateUserDto, UpdatUserDto } from "../dto/createUserDto";
import { AppDataSource } from "../config/data-source";

class UserService {
  userRepository = AppDataSource.getRepository(User);

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getUserById(
    id: number, //  : Promise<User | undefined>
  ) {
    const user = await this.userRepository.findOne({ where: { id } });
    return user;
  }

  async createUser(user: CreateUserDto): Promise<User> {
    return await this.userRepository.save(user);
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
