import express from "express";
import { register, login, logout, jwt_verify } from "../controllers/authCTRL.js";

const router = express.Router()

router.post("/login", login)
router.post("/register", register)
router.get("/logout", logout)
router.get("/verify", jwt_verify)


export default router