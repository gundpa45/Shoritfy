import { Router } from "express";

import { urlValidator } from "../validator/url.validator.js";
import urlController from "../controller/url.controller.js"

const router = Router();

router.post("/url",urlValidator,urlController.urlHandler)



export default router;