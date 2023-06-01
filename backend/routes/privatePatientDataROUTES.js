import express from "express";
import { 
    newPatient, 
    fetchDashboardData, 
    fetchPersonalData, 
    newPatientConfirmation,
    fetchAccountDetails,
    fetchPatientLists
} from "../controllers/privatePatientData/privatePatientDataCTRL.js";
import {
    savePersonalData,
    saveGeneralData,
} from "../controllers/privatePatientData/savePatientDataCTRL.js";

const router = express.Router()

router.post("/new-patient", newPatient)
router.get("/new-patient-confirmation", newPatientConfirmation)
router.get("/fetch-dashboard-data", fetchDashboardData)
router.get("/fetch-personal-data", fetchPersonalData)
router.get("/fetch-account-details-data", fetchAccountDetails)
router.get("/fetch-patient-lists", fetchPatientLists)

router.post("/save-personal-data", savePersonalData)
router.post("/save-general-data", saveGeneralData)

export default router
