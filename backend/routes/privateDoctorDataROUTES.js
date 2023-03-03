import express from "express";
import { newDoctor, dashboardData, personalData, savePersonalData, newDoctorConfirmation, saveDescriptionData, accountDetails} from "../controllers/privateDoctorDataCTRL.js";

const router = express.Router()

router.post("/new-doctor", newDoctor)
router.get("/new-doctor-confirmation", newDoctorConfirmation)
router.get("/dashboard-data", dashboardData)
router.get("/personal-data", personalData)
router.post("/save-personal-data", savePersonalData)
router.post("/save-description-data", saveDescriptionData)
router.get("/account-details-data", accountDetails)

export default router
