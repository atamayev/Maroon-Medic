import express from "express"
import {
  newPatient,
  fetchDashboardData,
  fetchPersonalData,
  fetchAccountDetails,
  fetchPetData,
} from "../controllers/private-patient-data/private-patient-data-CTRL.js"
import {
  savePersonalData,
  saveLanguageData,
  savePetData,
} from "../controllers/private-patient-data/save-patient-data-CTRL.js"

const router = express.Router()

router.post("/new-patient", newPatient)
router.get("/fetch-dashboard-data", fetchDashboardData)
router.get("/fetch-personal-data", fetchPersonalData)
router.get("/fetch-account-details-data", fetchAccountDetails)
router.get("/fetch-pet-data", fetchPetData)

router.post("/save-personal-data", savePersonalData)
router.post("/save-language-data", saveLanguageData)
router.post("/save-pet-data", savePetData)

export default router
