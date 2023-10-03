// import { Inject, Service } from "typedi";
// import { InjectRepository } from "typeorm-typedi-extensions";
import { UserRepository } from "../repositories/user.repository";
import { User } from "../entities/user.entity";
import { CreateUserDto, UpdatUserDto } from "../dto/createUserDto";

// @Service()
// export 
class UserService {
  // constructor(@InjectRepository(User) private readonly userRepository: UserRepository) {}
  
  // userRepository =  ------- UserRepository(User);

  async getAllUsers(): Promise<User[]> 
  {
    return await this.userRepository.find();
  }

   async getUserById(id: number)
  //  : Promise<User | undefined> 
  {
    const user = await this.userRepository.findOne({where: {id}});
    return user; 
  }

  async createUser(user: CreateUserDto): Promise<User> {
    return await this.userRepository.save(user);   
     
  }
  

  async updateUser(id: number, updatedUser: UpdatUserDto ): Promise<User | undefined> {
    // Partial<User>
    const user = await this.userRepository.save({ id, ...updatedUser });
    return user; 
  }

  async deleteUser(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}


const userService = new UserService();
export default userService;
