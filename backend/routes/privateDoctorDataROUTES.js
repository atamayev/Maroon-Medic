import express from "express";
import { 
    newDoctor, 
    fetchDashboardData, 
    fetchPersonalData, 
    newDoctorConfirmation, 
    fetchAccountDetails,
    FetchDoctorLists
}from "../controllers/privateDoctorData/privateDoctorDataCTRL.js";
import{
    savePersonalData, 
    saveDescriptionData,
    saveGeneralData,
    savePublicAvailibilityData,
    saveEducationData,
    saveServicesData
}from "../controllers/privateDoctorData/saveDoctorDataCTRL.js";

const router = express.Router()

router.post("/new-doctor", newDoctor)
router.get("/new-doctor-confirmation", newDoctorConfirmation)
router.get("/fetch-dashboard-data", fetchDashboardData)
router.get("/fetch-personal-data", fetchPersonalData)
router.get("/fetch-account-details-data", fetchAccountDetails)
router.get("/fetch-all-lists", FetchDoctorLists)

router.post("/save-personal-data", savePersonalData)
router.post("/save-description-data", saveDescriptionData)
router.post("/save-general-data", saveGeneralData)
router.post("/save-public-availibility-data", savePublicAvailibilityData)
router.post("/save-education-data", saveEducationData)
router.post("/save-services-data", saveServicesData)

export default router
