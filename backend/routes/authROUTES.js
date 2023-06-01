import express from "express";
import { 
    register, 
    login, 
    logout, 
    JWT_verify,
    fetchLoginHistory,

} from "../controllers/authCTRL.js";

const router = express.Router()

router.post("/login", login)
router.post("/register", register)
router.post("/logout", logout)
router.post("/verify", JWT_verify)
router.get("/fetch-login-history", fetchLoginHistory)

export default router
