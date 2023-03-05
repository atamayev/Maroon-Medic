import express from "express";
import { 
    register, 
    login, 
    logout, 
    jwt_verify 
} from "../controllers/authCTRL.js";

const router = express.Router()

router.post("/login", login)
router.post("/register", register)
router.post("/logout", logout)
router.post("/verify", jwt_verify)


export default router
