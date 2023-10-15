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
import validateSavePersonalDataRequestBody
	from "../middleware/request-validation/validate-save-personal-data-request-body"
import validateSavePetDataRequestBody
	from "../middleware/request-validation/patient-data-routes/validate-save-pet-data-request-body"
import validateSavePetMedicationDataRequestBody
	from "../middleware/request-validation/patient-data-routes/validate-save-pet-medication-data-request-body"
import validateSavePetProcedureDataRequestBody
	from "../middleware/request-validation/patient-data-routes/validate-save-pet-procedure-data-request-body"

const privatePatientDataRoutes = express.Router()

privatePatientDataRoutes.post("/new-patient", validateNewPatientDataRequestBody, newPatient)
privatePatientDataRoutes.get("/fetch-dashboard-data", fetchDashboardData)
privatePatientDataRoutes.get("/fetch-personal-data", fetchPersonalData)
privatePatientDataRoutes.get("/fetch-account-details-data", fetchAccountDetails)
privatePatientDataRoutes.get("/fetch-pet-data", fetchPetData)

privatePatientDataRoutes.post("/add-language/:languageId", addLanguage)
privatePatientDataRoutes.delete("/delete-language/:languageId", deleteLanguage)

privatePatientDataRoutes.post("/save-personal-data", validateSavePersonalDataRequestBody, savePersonalData)
privatePatientDataRoutes.post("/add-pet-data", validateSavePetDataRequestBody, addPet)
privatePatientDataRoutes.delete("/delete-pet-data/:petId", deletePet)

privatePatientDataRoutes.post("/add-pet-medication", validateSavePetMedicationDataRequestBody, addPetMedication)
privatePatientDataRoutes.post("/delete-pet-medication/:petMedicationId", deletePetMedication)

privatePatientDataRoutes.post("/add-pet-procedure", validateSavePetProcedureDataRequestBody, addPetProcedure)
privatePatientDataRoutes.post("/delete-pet-procedure/:petProcedureId", deletePetProcedure)

export default privatePatientDataRoutes
