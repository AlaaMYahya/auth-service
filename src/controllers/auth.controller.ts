import { 
    Request, 
    Response 
} from "express";
import { Authorized } from "routing-controllers";
import { getRepository } from "typeorm";
import { User } from "../entities/user.entity";
import bcryptjs from "bcryptjs";
import { 
    sign, 
    verify 
} from "jsonwebtoken";
import { config } from "../config/config";


export class AuthService{
   
    @Authorized()
    async login(req:Request, res:Response){
    // export const Login = async (req: Request, res: Response) => {
       
        const { email, password } = req.body;
        const user = await getRepository(User).findOne(
            // @CurrentUser({ required: true }) user: User,
        {
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
        }, config.accessTokenSecret! ,
         {expiresIn : 60 * 60 });

        const refreshToken = sign({
            id: user.id
        }, config.refreshTokenSecret!,
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

    @Authorized()
    async signup(req: Request, res: Response){
    // export const Signup = async (req: Request, res:Response ) => {
        const { username, email, password } =  req.body;

        const user = await getRepository(User).save({
            username, 
            email, 
            password: await bcryptjs.hash(password, 12)
        })

        res.send(user);
    }

    @Authorized()
    async logout(req:Request,res:Response ){
    // export const Logout = async (req: Request, res: Response) => {
        res.cookie('accessToke', '', {maxAge:0});
        res.cookie('refreshToken', '', {maxAge:0});
    }

    @Authorized()
    async refresh(req: Request, res: Response){
    // export const Refresh = async (req: Request, res: Response) => {
        try{
            const refreshToken = req.cookies['refreshToken'];

            const payload: any = verify(refreshToken, config.refreshTokenSecret!)

            if (!payload){
                return res.status(401).send({
                    message: 'unauthenticated'
                })
            }

            const accessToken = sign({
                id: payload.id,
            }, config.accessTokenSecret!, // ! or as string
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

    @Authorized()
    async checkUser(req: Request, res: Response){
    // export const CheckUser = async (req: Request, res:Response) =>{
        try {
            console.log(req.cookies);
            const accessToken = req.cookies['accessToken'];

            const payload: any = verify(accessToken, config.accessTokenSecret!);

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

            const { id,
                // password,
                 ...data } = user;
            res.send(data);

        }catch(e){
            console.log(e)
            return res.status(401).send({
                message: 'Unaythenticated'
            })
        }
    }

}
