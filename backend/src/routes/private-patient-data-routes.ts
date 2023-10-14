import express from "express"
import {
	newPatient,
	fetchDashboardData,
	fetchPersonalData,
	fetchAccountDetails,
	fetchPetData,
} from "../controllers/private-patient-data/private-patient-data-controller"
import {
	savePersonalData,
	addLanguage,
	deleteLanguage,
	addPet,
	deletePet,
	addPetInsurance,
	addPetProcedure,
	addPetMedication,
	deletePetMedication,
	deletePetProcedure
} from "../controllers/private-patient-data/save-patient-data-controller"

const router = express.Router()

router.post("/new-patient", newPatient)
router.get("/fetch-dashboard-data", fetchDashboardData)
router.get("/fetch-personal-data", fetchPersonalData)
router.get("/fetch-account-details-data", fetchAccountDetails)
router.get("/fetch-pet-data", fetchPetData)
router.post("/add-language", addLanguage)
router.delete("/delete-language/:languageId", deleteLanguage)

router.post("/save-personal-data", savePersonalData)
router.post("/add-pet-data", addPet)
router.delete("/delete-pet-data/:petId", deletePet)
router.post("/add-pet-insurance", addPetInsurance)

router.post("/add-pet-medication", addPetMedication)
router.post("/delete-pet-medication", deletePetMedication)

router.post("/add-pet-procedure", addPetProcedure)
router.post("/delete-pet-procedure", deletePetProcedure)

export default router
