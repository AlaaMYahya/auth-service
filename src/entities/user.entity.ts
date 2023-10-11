import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsNotEmpty } from "class-validator";


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column()
  username: string;

  @IsNotEmpty()
  @Column({})
  email: string;

  @IsNotEmpty()
  @Column({ select: false })
  password: string;

  @Column({ nullable: true })
  bio?: string;
  
}
