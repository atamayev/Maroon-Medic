import express from "express"
import {
  newPatient,
  fetchDashboardData,
  fetchPersonalData,
  fetchAccountDetails,
  fetchPetData,
} from "../controllers/private-patient-data/private-patient-data-CTRL.ts"
import {
  savePersonalData,
  addLanguage,
  deleteLanguage,
  addPet,
  deletePet,
} from "../controllers/private-patient-data/save-patient-data-CTRL.ts"

const router = express.Router()

router.post("/new-patient", newPatient)
router.get("/fetch-dashboard-data", fetchDashboardData)
router.get("/fetch-personal-data", fetchPersonalData)
router.get("/fetch-account-details-data", fetchAccountDetails)
router.get("/fetch-pet-data", fetchPetData)
router.post("/add-language", addLanguage)
router.delete("/delete-language/:languageID", deleteLanguage)

router.post("/save-personal-data", savePersonalData)
router.post("/add-pet-data", addPet)
router.delete("/delete-pet-data/:petID", deletePet)

export default router
