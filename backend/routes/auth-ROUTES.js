import express from "express";
import { 
    register, 
    login, 
    logout, 
    jwtVerify,
    fetchLoginHistory,
    changePassword
} from "../controllers/auth-CTRL.js";

const router = express.Router()

router.post("/login", login)
router.post("/register", register)
router.post("/logout", logout)
router.post("/verify", jwtVerify)
router.get("/fetch-login-history", fetchLoginHistory)
router.post("/change-password", changePassword)

export default router
