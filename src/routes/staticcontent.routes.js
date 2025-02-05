import { Router } from "express";
import { getStaticContent } from "../controllers/staticcontent.controller.js";
import { getStaticContentValidator } from "../middlewares/staticContentMiddleWare.js";
const router = Router()

router.get("/", getStaticContentValidator, getStaticContent)

export {
    router as staticcontentRoutes
}