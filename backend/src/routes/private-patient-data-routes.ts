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
	addPetProcedure,
	addPetMedication,
	deletePetMedication,
	deletePetProcedure
} from "../controllers/private-patient-data/save-patient-data-controller"
import validateNewPatientDataRequestBody
	from "../middleware/request-validation/patient-data-routes/validate-new-patient-data-request-body"

const privatePatientDataRoutes = express.Router()

privatePatientDataRoutes.post("/new-patient", validateNewPatientDataRequestBody, newPatient)
privatePatientDataRoutes.get("/fetch-dashboard-data", fetchDashboardData)
privatePatientDataRoutes.get("/fetch-personal-data", fetchPersonalData)
privatePatientDataRoutes.get("/fetch-account-details-data", fetchAccountDetails)
privatePatientDataRoutes.get("/fetch-pet-data", fetchPetData)
privatePatientDataRoutes.post("/add-language/:languageId", addLanguage)
privatePatientDataRoutes.delete("/delete-language/:languageId", deleteLanguage)

privatePatientDataRoutes.post("/save-personal-data", savePersonalData)
privatePatientDataRoutes.post("/add-pet-data", addPet)
privatePatientDataRoutes.delete("/delete-pet-data/:petId", deletePet)

privatePatientDataRoutes.post("/add-pet-medication", addPetMedication)
privatePatientDataRoutes.post("/delete-pet-medication", deletePetMedication)

privatePatientDataRoutes.post("/add-pet-procedure", addPetProcedure)
privatePatientDataRoutes.post("/delete-pet-procedure", deletePetProcedure)

export default privatePatientDataRoutes
