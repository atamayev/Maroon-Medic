import express from "express"
import {
	fetchDoctorLists,
	fetchPatientLists,
	fetchPetTypes,
	fetchInsurances,
	fetchPetMedications,
	fetchPetProcedures
} from "../controllers/lists-controller"

const listsRoutes = express.Router()

listsRoutes.get("/fetch-doctor-lists", fetchDoctorLists)
listsRoutes.get("/fetch-patient-lists", fetchPatientLists)
listsRoutes.get("/fetch-pet-types", fetchPetTypes)
listsRoutes.get("/fetch-insurances", fetchInsurances)
listsRoutes.get("/fetch-pet-medications", fetchPetMedications)
listsRoutes.get("/fetch-pet-procedures", fetchPetProcedures)

export default listsRoutes
