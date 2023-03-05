import express from "express";
import { newPatient, fetchDashboardData, fetchPersonalData, newPatientConfirmation} from "../controllers/privatePatientDataCTRL.js";

const router = express.Router()

router.post("/new-patient", newPatient)
router.get("/new-patient-confirmation", newPatientConfirmation)
router.get("/fetch-dashboard-data", fetchDashboardData)
router.get("/fetch-personal-data", fetchPersonalData)


export default router
