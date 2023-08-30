import express from "express"
import {
	searchByQuery,
	fetchUsers,
	fetchAllLanguages,
	fetchAllServicesAndCategories
} from "../controllers/search-controller"

const router = express.Router()

router.get("/s/:query", searchByQuery)
router.get("/fetchAllUsers", fetchUsers)
router.get("/fetch-languages-list", fetchAllLanguages)
router.get("/fetch-services-and-categories-list", fetchAllServicesAndCategories)

export default router
