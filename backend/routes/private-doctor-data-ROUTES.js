import express from "express"
import {
  newDoctor,
  fetchDashboardData,
  fetchPersonalData,
  fetchAccountDetails
} from "../controllers/private-doctor-data/private-doctor-data-CTRL.js"
import {
  savePersonalData,
  saveDescriptionData,
  addLanguage,
  deleteLanguage,
  // addSpecialty,
  // deleteSpecialty,
  // addServidedPet,
  // deleteServiedPet,
  savePublicAvailibilityData,
  saveEducationData,
  saveServicesData,
  saveAddressData
} from "../controllers/private-doctor-data/save-doctor-data-CTRL.js"

const router = express.Router()

router.post("/new-doctor", newDoctor)
router.get("/fetch-dashboard-data", fetchDashboardData)
router.get("/fetch-personal-data", fetchPersonalData)
router.get("/fetch-account-details-data", fetchAccountDetails)

router.post("/save-personal-data", savePersonalData)
router.post("/save-description-data", saveDescriptionData)
router.post("/add-language", addLanguage)
router.delete("/delete-language/:languageID", deleteLanguage)
// router.post("/add-specialty", addSpecialty)
// router.delete("/delete-specialty", deleteSpecialty)
// router.post("/add-serviced-pet", addServidedPet)
// router.delete("/delete-serviced-pet", deleteServiedPet)

router.post("/save-public-availibility-data", savePublicAvailibilityData)
router.post("/save-education-data", saveEducationData)
router.post("/save-services-data", saveServicesData)
router.post("/save-address-data", saveAddressData)

export default router
