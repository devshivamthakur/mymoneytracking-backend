import { Router } from "express";
import { getStaticContent } from "../controllers/staticcontent.controller.js";
const router = Router()

router.get("/", getStaticContent)

export {
    router as staticcontentRoutes
}