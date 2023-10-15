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
import validateNewDoctorDataRequestBody
	from "../middleware/request-validation/private-doctor-data-routes/validate-new-doctor-data-request-body"
import validateSavePersonalDataRequestBody
	from "../middleware/request-validation/private-doctor-data-routes/validate-save-personal-data-request-body"
import validateSaveDescriptionDataRequestBody
	from "../middleware/request-validation/private-doctor-data-routes/validate-save-description-data-request-body"

const privateDoctorDataRoutes = express.Router()

privateDoctorDataRoutes.post("/new-doctor", validateNewDoctorDataRequestBody, newDoctor)
privateDoctorDataRoutes.get("/fetch-dashboard-data", fetchDashboardData)
privateDoctorDataRoutes.get("/fetch-personal-data", fetchPersonalData)
privateDoctorDataRoutes.get("/fetch-account-details-data", fetchAccountDetails)

privateDoctorDataRoutes.post("/save-personal-data", validateSavePersonalDataRequestBody, savePersonalData)
privateDoctorDataRoutes.post("/save-description-data", validateSaveDescriptionDataRequestBody, saveDescriptionData)

privateDoctorDataRoutes.post("/add-language", addLanguage)
privateDoctorDataRoutes.delete("/delete-language/:languageId", deleteLanguage)

privateDoctorDataRoutes.post("/add-specialty", addSpecialty)
privateDoctorDataRoutes.delete("/delete-specialty/:specialtyId", deleteSpecialty)

privateDoctorDataRoutes.post("/add-serviced-pet", addServicedPet)
privateDoctorDataRoutes.delete("/delete-serviced-pet/:servicedPetId", deleteServicedPet)

privateDoctorDataRoutes.post("/add-pre-vet-education-data", addPreVetEducationData)
privateDoctorDataRoutes.delete("/delete-pre-vet-education-data/:preVetEducationId", deletePreVetEducationData)

privateDoctorDataRoutes.post("/add-vet-education-data", addVetEducationData)
privateDoctorDataRoutes.delete("/delete-vet-education-data/:vetEducationId", deleteVetEducationData)

privateDoctorDataRoutes.post("/add-service", addService)
privateDoctorDataRoutes.patch("/update-service", updateService)
privateDoctorDataRoutes.delete("/delete-service/:serviceId", deleteService)

privateDoctorDataRoutes.post("/add-address", addAddress)
privateDoctorDataRoutes.patch("/update-address", updateAddress)
privateDoctorDataRoutes.delete("/delete-address/:addressId", deleteAddress)

privateDoctorDataRoutes.post("/save-public-availibility-data", savePublicAvailibilityData)

export default privateDoctorDataRoutes
