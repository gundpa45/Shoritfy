import { Router } from "express";
import authController from "../controllers/user.controller.js"


const router = Router();

// Auth routes — use POST for credential-bearing requests
router.post("/register", authController.registerController)
router.post("/login", authController.loginController)


export default router;