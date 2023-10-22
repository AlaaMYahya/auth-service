import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsNotEmpty } from "class-validator";


@Entity()
class Session{
  @Column()
  refreshToken: {
    type: string,
    default: "",
  }
}

@Entity()
export class User {
    // static authenticate(): any {
    //     throw new Error('Method not implemented.');
    // }
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

  @Column()
  accesshToken: string;

  @Column()
  refreshToken: { type: [Session],};
    // static serializeUser: any;
  
}

// User.set("toJSON", {
//   transform: function (doc, ret, options) {
//     delete ret.refreshToken
//     return ret
//   },
// })