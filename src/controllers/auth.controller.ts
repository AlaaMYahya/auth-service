import { 
    Request, 
    Response 
} from "express";
import { getRepository } from "typeorm";
import { User } from "../entities/user.entity";
import bcryptjs from "bcryptjs";
import { 
    sign, 
    verify 
} from "jsonwebtoken";

// import dotenv from 'dotenv'; 
// dotenv.config();

    export const Login = async (req: Request, res: Response) => {
       
        const { email, password } = req.body;
        const user = await getRepository(User).findOne({
            where:{ email : email}
        });
        if(!user){
            return res.status(400).send({message: "Invalid credentials"})
        }
        if (!await bcryptjs.compare(password, user.password)){
            return res.status(400).send({ message: 'Invalid credentials'})
        }

        const accessToken = sign({
            id: user.id
        }, "ACCESS_TOKEN",
         {expiresIn : 60 * 60 });

        const refreshToken = sign({
            id: user.id
        }, "REFRESH_TOKEN",
         {expiresIn: 24 * 60 * 60 })

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 *1000
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly:true,
            maxAge:  7 * 24 * 60 * 60 * 1000
        })

        res.send({
            message: 'success'
        });
    }


    export const Signup = async (req: Request, res:Response ) => {
        const { username, email, password } =  req.body;

        const user = await getRepository(User).save({
            username, 
            email, 
            password: await bcryptjs.hash(password, 12)
        })

        res.send(user);
    }


    export const Logout = async (req: Request, res: Response) => {
        res.cookie('accessToke', '', {maxAge:0});
        res.cookie('refreshToken', '', {maxAge:0});
    }

    export const Refresh = async (req: Request, res: Response) => {
        try{
            const refreshToken = req.cookies['refreshToken'];

            const payload: any = verify(refreshToken, "REFRESH_TOKEN")

            if (!payload){
                return res.status(401).send({
                    message: 'unauthenticated'
                })
            }

            const accessToken = sign({
                id: payload.id,
            }, "eeb88ea4804fa705dfcb6ec7dbde399c30a0576d24529746ade60600b45cbaa2c166db405c69631bb1ad76794e388727b7fdf3ba6fbc19365af553ecebb7b7ce",
             {expiresIn: 60 * 60 })

            res.cookie('accessToken', accessToken, {
                httpOnly:true,
                maxAge: 24 * 60 * 60 * 1000
            });

            res.send({
                message: 'success'
            })

        }catch(e){
            return res.status(401).send({
                message: 'unauthenticated'
            })
        }
    }


    export const CheckUser = async (req: Request, res:Response) =>{
        try {
            console.log(req.cookies);
            const accessToken = req.cookies['accessToken'];

            const payload: any = verify(accessToken, "ACCESS_TOKEN");

            if (!payload){
                return res.status(401).send({
                    message: 'Unauthenticated'
                })
            }

            const user = await getRepository(User).findOne({
                where: {
                    id: payload.id
                }
            });

            if (!user) {
                return res.status(401).send({
                    message: 'Unauthenticated'
                })
            }

            const { password, ...data } = user;
            res.send(data);

        }catch(e){
            console.log(e)
            return res.status(401).send({
                message: 'Unaythenticated'
            })
        }
    }

