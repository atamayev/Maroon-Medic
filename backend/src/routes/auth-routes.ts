import express from "express"
import fetchLoginHistory from "../controllers/auth/fetch-login-history"
import login from "../controllers/auth/login"
import register from "../controllers/auth/register"
import changePassword from "../controllers/auth/change-password"
import logout from "../controllers/auth/logout"
import { newDoctorConfirmation, newPatientConfirmation } from "../controllers/auth/new-user-confirmation"
import jwtVerify from "../middleware/jwt-verify"

const router = express.Router()

router.post("/login", login)
router.post("/register", register)
router.post("/logout", jwtVerify, logout)
router.get("/fetch-login-history", jwtVerify, fetchLoginHistory)
router.post("/change-password", jwtVerify, changePassword)
router.get("/new-doctor-confirmation", jwtVerify, newDoctorConfirmation)
router.get("/new-patient-confirmation", jwtVerify, newPatientConfirmation)

export default router
