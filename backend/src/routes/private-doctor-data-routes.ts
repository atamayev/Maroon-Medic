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
	from "../middleware/request-validation/validate-save-personal-data-request-body"
import validateSaveDescriptionDataRequestBody
	from "../middleware/request-validation/private-doctor-data-routes/validate-save-description-data-request-body"
import validateAddVetEducationDataRequestBody
	from "../middleware/request-validation/private-doctor-data-routes/validate-add-vet-education-data-request-body"
import validateAddAddressDataRequestBody
	from "../middleware/request-validation/private-doctor-data-routes/validate-add-address-data-request-body"
import validatePublicAvailabilityRequestBody
	from "../middleware/request-validation/private-doctor-data-routes/validate-public-availability-request-body"

const privateDoctorDataRoutes = express.Router()

privateDoctorDataRoutes.post("/new-doctor", validateNewDoctorDataRequestBody, newDoctor)
privateDoctorDataRoutes.get("/fetch-dashboard-data", fetchDashboardData)
privateDoctorDataRoutes.get("/fetch-personal-data", fetchPersonalData)
privateDoctorDataRoutes.get("/fetch-account-details-data", fetchAccountDetails)

privateDoctorDataRoutes.post("/save-personal-data", validateSavePersonalDataRequestBody, savePersonalData)
privateDoctorDataRoutes.post("/save-description-data", validateSaveDescriptionDataRequestBody, saveDescriptionData)

privateDoctorDataRoutes.post("/add-language/:languageId", addLanguage)
privateDoctorDataRoutes.delete("/delete-language/:languageId", deleteLanguage)

privateDoctorDataRoutes.post("/add-specialty/:specialtyId", addSpecialty)
privateDoctorDataRoutes.delete("/delete-specialty/:specialtyId", deleteSpecialty)

privateDoctorDataRoutes.post("/add-serviced-pet/:servicedPetId", addServicedPet)
privateDoctorDataRoutes.delete("/delete-serviced-pet/:servicedPetId", deleteServicedPet)

privateDoctorDataRoutes.post("/add-pre-vet-education-data", validateAddVetEducationDataRequestBody, addPreVetEducationData)
privateDoctorDataRoutes.delete("/delete-pre-vet-education-data/:preVetEducationId", deletePreVetEducationData)

privateDoctorDataRoutes.post("/add-vet-education-data", addVetEducationData)
privateDoctorDataRoutes.delete("/delete-vet-education-data/:vetEducationId", deleteVetEducationData)

privateDoctorDataRoutes.post("/add-service", addService)
privateDoctorDataRoutes.patch("/update-service", updateService)
privateDoctorDataRoutes.delete("/delete-service/:serviceId", deleteService)

privateDoctorDataRoutes.post("/add-address", validateAddAddressDataRequestBody, addAddress)
privateDoctorDataRoutes.patch("/update-address", validateAddAddressDataRequestBody, updateAddress)
privateDoctorDataRoutes.delete("/delete-address/:addressId", deleteAddress)

privateDoctorDataRoutes.post("/save-public-availibility-data", validatePublicAvailabilityRequestBody, savePublicAvailibilityData)

export default privateDoctorDataRoutes
