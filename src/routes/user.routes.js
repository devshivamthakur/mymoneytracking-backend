import { Router } from "express";
import { loginUser } from "../controllers/user.controllers.js";
import { loginValidator } from "../middlewares/loginValidator.js";
const router = Router()

router.post("/login", loginValidator, loginUser)

export default  router