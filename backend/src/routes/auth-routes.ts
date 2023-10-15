import express from "express"
import fetchLoginHistory from "../controllers/auth/fetch-login-history"
import login from "../controllers/auth/login"
import register from "../controllers/auth/register"
import changePassword from "../controllers/auth/change-password"
import logout from "../controllers/auth/logout"
import { newDoctorConfirmation, newPatientConfirmation } from "../controllers/auth/new-user-confirmation"
import jwtVerify from "../middleware/jwt-verify"
import validateLoginRequestBody from "../middleware/request-validation/auth-routes/validate-login-request-body"
import validateRegisterRequestBody from "../middleware/request-validation/auth-routes/validate-register-request-body"
import validateChangePasswordRequest from "../middleware/request-validation/auth-routes/validate-change-password-request-body"
import validateUUIDInHeader from "../middleware/request-validation/auth-routes/validate-uuid-in-header"
import validateNewUserConfirmationRequest from "../middleware/request-validation/auth-routes/validate-new-user-request"

const authRoutes = express.Router()

authRoutes.post("/login", validateLoginRequestBody, login)
authRoutes.post("/register", validateRegisterRequestBody, register)
authRoutes.post("/logout", jwtVerify, validateUUIDInHeader, logout)
authRoutes.get("/fetch-login-history", jwtVerify, validateUUIDInHeader, fetchLoginHistory)
authRoutes.post("/change-password", jwtVerify, validateChangePasswordRequest, changePassword)
authRoutes.get("/new-doctor-confirmation", jwtVerify, validateNewUserConfirmationRequest, newDoctorConfirmation)
authRoutes.get("/new-patient-confirmation", jwtVerify, validateNewUserConfirmationRequest, newPatientConfirmation)

export default authRoutes
