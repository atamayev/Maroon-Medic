import express from "express";
import { newPatient, dashboardData, personalData, newPatientConfirmation} from "../controllers/privatePatientDataCTRL.js";

const router = express.Router()

router.post("/new-patient", newPatient)
router.get("/new-patient-confirmation", newPatientConfirmation)
router.get("/dashboard-data", dashboardData)
router.get("/personal-data", personalData)


export default router
