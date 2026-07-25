import { Router } from "express";

import { urlValidator } from "../validators/url.validator.js";
import urlController from "../controllers/url.controller.js"

const router = Router();

router.post("/url",urlValidator,urlController.urlHandler)



export default router;