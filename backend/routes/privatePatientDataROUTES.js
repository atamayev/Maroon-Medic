import express from "express";
import { 
    newPatient, 
    fetchDashboardData, 
    fetchPersonalData, 
    newPatientConfirmation,
    savePersonalData
} from "../controllers/privatePatientDataCTRL.js";

const router = express.Router()

router.post("/new-patient", newPatient)
router.get("/new-patient-confirmation", newPatientConfirmation)
router.get("/fetch-dashboard-data", fetchDashboardData)
router.get("/fetch-personal-data", fetchPersonalData)
router.post("/save-personal-data", savePersonalData)


export default router
