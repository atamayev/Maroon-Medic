import express from "express";
import { newDoctor, dashboardData, personalData, savePersonalData, newDoctorConfirmation} from "../controllers/privateDoctorDataCTRL.js";

const router = express.Router()

router.post("/new-doctor", newDoctor)
router.get("/new-doctor-confirmation", newDoctorConfirmation)
router.get("/dashboard-data", dashboardData)
router.get("/personal-data", personalData)
router.post("/save-personal-data", savePersonalData)

export default router
