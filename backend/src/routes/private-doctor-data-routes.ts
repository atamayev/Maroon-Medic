import express from "express"
import {
	newDoctor,
	fetchDashboardData,
	fetchPersonalData,
	fetchAccountDetails
} from "../controllers/private-doctor-data/private-doctor-data-controller"
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
	addPreVetEducationData,
	deletePreVetEducationData,
	addVetEducationData,
	deleteVetEducationData,
	addAddress,
	deleteAddress,
	updateAddress
} from "../controllers/private-doctor-data/save-doctor-data-controller"

const router = express.Router()

router.post("/new-doctor", newDoctor)
router.get("/fetch-dashboard-data", fetchDashboardData)
router.get("/fetch-personal-data", fetchPersonalData)
router.get("/fetch-account-details-data", fetchAccountDetails)

router.post("/save-personal-data", savePersonalData)
router.post("/save-description-data", saveDescriptionData)

router.post("/add-language", addLanguage)
router.delete("/delete-language/:languageId", deleteLanguage)

router.post("/add-specialty", addSpecialty)
router.delete("/delete-specialty/:specialtyId", deleteSpecialty)

router.post("/add-serviced-pet", addServicedPet)
router.delete("/delete-serviced-pet/:servicedPetId", deleteServicedPet)

router.post("/add-pre-vet-education-data", addPreVetEducationData)
router.delete("/delete-pre-vet-education-data/:preVetEducationId", deletePreVetEducationData)

router.post("/add-vet-education-data", addVetEducationData)
router.delete("/delete-vet-education-data/:vetEducationId", deleteVetEducationData)

router.post("/add-service", addService)
router.patch("/update-service", updateService)
router.delete("/delete-service/:serviceId", deleteService)

router.post("/add-address", addAddress)
router.patch("/update-address", updateAddress)
router.delete("/delete-address/:addressId", deleteAddress)

router.post("/save-public-availibility-data", savePublicAvailibilityData)

export default router
