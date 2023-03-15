import express from "express";
import { 
    searchByQuery, 
    fetchUsers, 
    fetchAllLanguages, 
    fetchAllServicesAndCategories,
    fetchAllInsurances
} from "../controllers/searchCTRL.js";

const router = express.Router()

router.get("/s/:query", searchByQuery)
router.get("/fetchAllUsers", fetchUsers)
router.get("/fetch-languages-list", fetchAllLanguages)
router.get("/fetch-services-and-categories-list", fetchAllServicesAndCategories)
router.get("/fetch-insurances-list", fetchAllInsurances)


export default router
