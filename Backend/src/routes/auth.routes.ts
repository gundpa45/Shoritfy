import { Router } from "express";
import authController from "../controller/user.controller.js"


const router =Router();

//login and register page 

router.get("/register", authController.registerController)
router.get("/login", authController.loginController)


export default router;