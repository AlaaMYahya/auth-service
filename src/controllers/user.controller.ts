import { JsonController, Get, Post, Put, Delete, Param, Body } from "routing-controllers";
import { userService }  from "../services/user.service"
import { User } from "../entities/user.entity";
import { CreateUserDto, UpdatUserDto } from "../dto/createUserDto";

@JsonController('/users')
export class UserController {
  
  @Get("/")
  async getAllUsers() : Promise<User[]>  {
    // return "You can get the users";
    return userService.getAllUsers();
  }

  @Get("/:id")
  async getUserById(@Param("id") id: number)
//   : Promise<User | undefined>
   {
    return userService.getUserById(id);
  }

  @Post("/")
  createUser(@Body() user: CreateUserDto) : Promise<User> 
  {
    return userService.createUser(user);
  }

  @Put("/:id")
  updateUser(@Param("id") id: number, @Body() updatedUser: UpdatUserDto ): Promise<User | undefined> {
    return userService.updateUser(id, updatedUser);
  }

  @Delete("/:id")
  deleteUser(@Param("id") id: number): Promise<void>  {
    return userService.deleteUser(id);
  }
}
