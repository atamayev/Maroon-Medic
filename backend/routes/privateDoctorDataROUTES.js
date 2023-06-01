import express from "express";
import { 
    newDoctor, 
    fetchDashboardData, 
    fetchPersonalData, 
    newDoctorConfirmation, 
    fetchAccountDetails,
    fetchDoctorLists,
    confirmAppointment
}from "../controllers/privateDoctorData/privateDoctorDataCTRL.js";
import{
    savePersonalData, 
    saveDescriptionData,
    saveGeneralData,
    savePublicAvailibilityData,
    saveEducationData,
    saveServicesData,
    saveAddressData
}from "../controllers/privateDoctorData/saveDoctorDataCTRL.js";

const router = express.Router()

router.post("/new-doctor", newDoctor)
router.get("/new-doctor-confirmation", newDoctorConfirmation)
router.get("/fetch-dashboard-data", fetchDashboardData)
router.get("/fetch-personal-data", fetchPersonalData)
router.get("/fetch-account-details-data", fetchAccountDetails)
router.get("/fetch-doctor-lists", fetchDoctorLists)
router.post("/confirm-appointment", confirmAppointment)

router.post("/save-personal-data", savePersonalData)
router.post("/save-description-data", saveDescriptionData)
router.post("/save-general-data", saveGeneralData)
router.post("/save-public-availibility-data", savePublicAvailibilityData)
router.post("/save-education-data", saveEducationData)
router.post("/save-services-data", saveServicesData)
router.post("/save-address-data", saveAddressData)

export default router
