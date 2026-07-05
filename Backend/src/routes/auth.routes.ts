import { Router } from "express";
import authController from "../controller/user.controller.js"


const router =Router();

router.get("/register", authController.registerController)
router.post("/login", authController.loginController)


export default router;