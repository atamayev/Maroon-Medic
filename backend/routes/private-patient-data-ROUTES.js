import express from "express"
import {
  newPatient,
  fetchDashboardData,
  fetchPersonalData,
  newPatientConfirmation,
  fetchAccountDetails,
  fetchPatientLists,
  fetchPetData,
  fetchPetTypes,
  fetchInsurances
} from "../controllers/private-patient-data/private-patient-data-CTRL.js"
import {
  savePersonalData,
  saveLanguageData,
  savePetData,
} from "../controllers/private-patient-data/save-patient-data-CTRL.js"

const router = express.Router()

router.post("/new-patient", newPatient)
router.get("/new-patient-confirmation", newPatientConfirmation)
router.get("/fetch-dashboard-data", fetchDashboardData)
router.get("/fetch-personal-data", fetchPersonalData)
router.get("/fetch-account-details-data", fetchAccountDetails)
router.get("/fetch-patient-lists", fetchPatientLists)
router.get("/fetch-pet-data", fetchPetData)
router.get("/fetch-pet-types", fetchPetTypes)
router.get("/fetch-insurances", fetchInsurances)

router.post("/save-personal-data", savePersonalData)
router.post("/save-language-data", saveLanguageData)
router.post("/save-pet-data", savePetData)

export default router
