import express from "express"
import fetchLoginHistory from "../controllers/auth/fetch-login-history"
import login from "../controllers/auth/login"
import register from "../controllers/auth/register"
import changePassword from "../controllers/auth/change-password"
import logout from "../controllers/auth/logout"
import { newDoctorConfirmation, newPatientConfirmation } from "../controllers/auth/new-user-confirmation"
import jwtVerify from "../middleware/jwt-verify"

const authRoutes = express.Router()

authRoutes.post("/login", login)
authRoutes.post("/register", register)
authRoutes.post("/logout", jwtVerify, logout)
authRoutes.get("/fetch-login-history", jwtVerify, fetchLoginHistory)
authRoutes.post("/change-password", jwtVerify, changePassword)
authRoutes.get("/new-doctor-confirmation", jwtVerify, newDoctorConfirmation)
authRoutes.get("/new-patient-confirmation", jwtVerify, newPatientConfirmation)

export default authRoutes
