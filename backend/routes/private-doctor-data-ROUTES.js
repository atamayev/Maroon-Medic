import express from "express"
import GetIDFromUUID from "../utils/getIDFromUUID.js"
import {
  newDoctor,
  fetchDashboardData,
  fetchPersonalData,
  newDoctorConfirmation,
  fetchAccountDetails,
  fetchDoctorLists
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

router.post("/new-doctor", GetIDFromUUID.getDoctorIDFromUUID, newDoctor)
router.get("/new-doctor-confirmation", newDoctorConfirmation) // Move to auth.js, and put GetIDFromUUID.getDoctorIDFromUUID as a middleware on teh index level
router.get("/fetch-dashboard-data", GetIDFromUUID.getDoctorIDFromUUID, fetchDashboardData)
router.get("/fetch-personal-data", GetIDFromUUID.getDoctorIDFromUUID, fetchPersonalData)
router.get("/fetch-account-details-data", GetIDFromUUID.getDoctorIDFromUUID, fetchAccountDetails)
router.get("/fetch-doctor-lists", fetchDoctorLists)

router.post("/save-personal-data", GetIDFromUUID.getDoctorIDFromUUID, savePersonalData)
router.post("/save-description-data", GetIDFromUUID.getDoctorIDFromUUID, saveDescriptionData)
router.post("/add-language", GetIDFromUUID.getDoctorIDFromUUID, addLanguage)
router.delete("/delete-language/:languageID", GetIDFromUUID.getDoctorIDFromUUID, deleteLanguage)
// router.post("/add-specialty", GetIDFromUUID.getDoctorIDFromUUID, addSpecialty)
// router.delete("/delete-specialty", GetIDFromUUID.getDoctorIDFromUUID, deleteSpecialty)
// router.post("/add-serviced-pet", GetIDFromUUID.getDoctorIDFromUUID, addServidedPet)
// router.delete("/delete-serviced-pet", GetIDFromUUID.getDoctorIDFromUUID, deleteServiedPet)

router.post("/save-public-availibility-data", GetIDFromUUID.getDoctorIDFromUUID, savePublicAvailibilityData)
router.post("/save-education-data", GetIDFromUUID.getDoctorIDFromUUID, saveEducationData)
router.post("/save-services-data", GetIDFromUUID.getDoctorIDFromUUID, saveServicesData)
router.post("/save-address-data", GetIDFromUUID.getDoctorIDFromUUID, saveAddressData)

export default router
