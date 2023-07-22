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
  addSpecialty,
  deleteSpecialty,
  addServicedPet,
  deleteServicedPet,
  savePublicAvailibilityData,
  addService,
  deleteService,
  updateService,
  saveAddressData,
  addPreVetEducationData,
  deletePreVetEducationData,
  addVetEducationData,
  deleteVetEducationData,
  addAddress,
  deleteAddress
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

router.post("/add-specialty", addSpecialty)
router.delete("/delete-specialty/:specialtyID", deleteSpecialty)

router.post("/add-serviced-pet", addServicedPet)
router.delete("/delete-serviced-pet/:servicedPetID", deleteServicedPet)

router.post("/add-pre-vet-education-data", addPreVetEducationData)
router.delete("/delete-pre-vet-education-data/:preVetEducationID", deletePreVetEducationData)

router.post("/add-vet-education-data", addVetEducationData)
router.delete("/delete-vet-education-data/:vetEducationID", deleteVetEducationData)

router.post("/add-service", addService)
router.post("/update-service", updateService)
router.delete("/delete-service/:serviceID", deleteService)

router.post("/add-address", saveAddressData)
router.post("/update-address", addAddress)
router.post("/delete-address", deleteAddress)

router.post("/save-public-availibility-data", savePublicAvailibilityData)

export default router
