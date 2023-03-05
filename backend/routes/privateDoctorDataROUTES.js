import express from "express";
import { newDoctor, fetchDashboardData, fetchPersonalData, savePersonalData, newDoctorConfirmation, saveDescriptionData, fetchAccountDetails} from "../controllers/privateDoctorDataCTRL.js";

const router = express.Router()

router.post("/new-doctor", newDoctor)
router.get("/new-doctor-confirmation", newDoctorConfirmation)
router.get("/fetch-dashboard-data", fetchDashboardData)
router.get("/fetch-personal-data", fetchPersonalData)
router.post("/save-personal-data", savePersonalData)
router.post("/save-description-data", saveDescriptionData)
router.get("/fetch-account-details-data", fetchAccountDetails)

export default router
