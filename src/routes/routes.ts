import { Router } from "express";
import { 
    Login,
    Signup, 
    Logout,
    Refresh,
    CheckUser 
} from "../controllers/auth.controller";
import { authenticate  } from "passport";


export const routes = (router: Router) => {
    router.post("/login", authenticate('local'), Login)
    router.post("/signup", authenticate('local'), Signup)
    router.post("/refresh", authenticate('local'), Refresh)
    router.post("/logout", authenticate('local'), Logout)
    router.get("/Chech-user", authenticate('local'), CheckUser)
};