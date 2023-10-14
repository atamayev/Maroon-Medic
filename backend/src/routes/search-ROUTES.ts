import express from "express"
import {
	searchByQuery,
	fetchUsers,
	fetchAllLanguages,
	fetchAllServicesAndCategories
} from "../controllers/search-controller"

const searchRoutes = express.Router()

searchRoutes.get("/s/:query", searchByQuery)
searchRoutes.get("/fetch-all-users", fetchUsers)
searchRoutes.get("/fetch-languages-list", fetchAllLanguages)
searchRoutes.get("/fetch-services-and-categories-list", fetchAllServicesAndCategories)

export default searchRoutes
