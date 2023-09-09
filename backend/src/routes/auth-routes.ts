import express from "express"
import fetchLoginHistory from "../controllers/auth/fetch-login-history"
import login from "../controllers/auth/login"
import register from "../controllers/auth/register"
import changePassword from "../controllers/auth/change-password"
import logout from "../controllers/auth/logout"
import { newDoctorConfirmation, newPatientConfirmation } from "../controllers/auth/new-user-confirmation"

const router = express.Router()

router.post("/login", login)
router.post("/register", register)
router.post("/logout", logout)
router.get("/fetch-login-history", fetchLoginHistory)
router.post("/change-password", changePassword)
router.get("/new-doctor-confirmation", newDoctorConfirmation)
router.get("/new-patient-confirmation", newPatientConfirmation)

export default router
