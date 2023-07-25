import express from "express"
import {
  register,
  login,
  logout,
  jwtVerify,
  fetchLoginHistory,
  changePassword,
  newDoctorConfirmation,
  newPatientConfirmation
} from "../controllers/auth-CTRL"

const router = express.Router()

router.post("/login", login)
router.post("/register", register)
router.post("/logout", logout)
router.post("/verify", jwtVerify)
router.get("/fetch-login-history", fetchLoginHistory)
router.post("/change-password", changePassword)
router.get("/new-doctor-confirmation", newDoctorConfirmation)
router.get("/new-patient-confirmation", newPatientConfirmation)

export default router
