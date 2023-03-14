import express from "express";
import { 
    newDoctor, 
    fetchDashboardData, 
    fetchPersonalData, 
    newDoctorConfirmation, 
    fetchAccountDetails,
    fetchAllLists
}from "../controllers/privateDoctorData/privateDoctorDataCTRL.js";
// import{
//     fetchAllLanguages,
//     fetchAllSpecialties,
//     fetchAllServicesAndCategories,
//     fetchAllSchools,
//     fetchAllMajors,
//     fetchAllInsurances,
//     fetchAllEducationTypes
// }from "../controllers/privateDoctorData/fetchAllXCTRL.js";

import{
    saveDescriptionData,
    saveLanguageData,
    savePersonalData, 
    savePublicAvailibilityData
}from "../controllers/privateDoctorData/saveDoctorDataCTRL.js";

const router = express.Router()

router.post("/new-doctor", newDoctor)
router.get("/new-doctor-confirmation", newDoctorConfirmation)
router.get("/fetch-dashboard-data", fetchDashboardData)
router.get("/fetch-personal-data", fetchPersonalData)
router.get("/fetch-account-details-data", fetchAccountDetails)
router.get("/fetch-all-lists", fetchAllLists)

// router.get("/fetch-all-languages", fetchAllLanguages)
// router.get("/fetch-all-specialties", fetchAllSpecialties)
// router.get("/fetch-all-services-and-categories", fetchAllServicesAndCategories)
// router.get("/fetch-all-schools", fetchAllSchools)
// router.get("/fetch-all-majors", fetchAllMajors)
// router.get("/fetch-all-insurances", fetchAllInsurances)
// router.get("/fetch-all-education-types", fetchAllEducationTypes)

router.post("/save-personal-data", savePersonalData)
router.post("/save-description-data", saveDescriptionData)
router.post("/save-language-data", saveLanguageData)
router.post("/save-public-availibility-data", savePublicAvailibilityData)
export default router
