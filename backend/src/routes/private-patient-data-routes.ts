import express from "express"
import {
	newPatient,
	fetchDashboardData,
	fetchPersonalData,
	fetchAccountDetails,
	pets,
} from "../controllers/private-patient-data/private-patient-data-controller"
import {
	savePersonalData,
	addLanguage,
	deleteLanguage,
	addPet,
	deletePet,
} from "../controllers/private-patient-data/save-patient-data-controller"

const router = express.Router()

router.post("/new-patient", newPatient)
router.get("/fetch-dashboard-data", fetchDashboardData)
router.get("/fetch-personal-data", fetchPersonalData)
router.get("/fetch-account-details-data", fetchAccountDetails)
router.get("/fetch-pet-data", pets)
router.post("/add-language", addLanguage)
router.delete("/delete-language/:languageId", deleteLanguage)

router.post("/save-personal-data", savePersonalData)
router.post("/add-pet-data", addPet)
router.delete("/delete-pet-data/:petId", deletePet)

export default router
