import express, { Request, Response, NextFunction, Router }  from "express";
import { AuthService } from "../controllers/auth.controller";
import { authenticate  } from "passport";

const authService = new AuthService();

export const routes = (router: Router) => {
    router.post("/login", authenticate('local'), authService.login)
    router.post("/signup", authenticate('local'), authService.signup)
    router.post("/refresh", authenticate('local'), authService.refresh)
    router.post("/logout", authenticate('local'), authService.logout)
    router.get("/Chech-user", authenticate('local'), authService.checkUser)
};