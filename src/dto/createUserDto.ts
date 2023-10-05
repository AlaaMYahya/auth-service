import { IsString, IsEmail, IsOptional } from "class-validator";

export class CreateUserDto {
  id: number;

  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  bio?: string;
}

export class UpdatUserDto {
  // id: number;

  @IsString()
  @IsOptional()
  username?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  bio?: string;
}
