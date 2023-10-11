import express from "express"
import {
	fetchDoctorLists,
	fetchPatientLists,
	fetchPetTypes,
	fetchInsurances,
	fetchPetMedications,
	fetchPetProcedures
} from "../controllers/lists-controller"

const router = express.Router()

router.get("/fetch-doctor-lists", fetchDoctorLists)
router.get("/fetch-patient-lists", fetchPatientLists)
router.get("/fetch-pet-types", fetchPetTypes)
router.get("/fetch-insurances", fetchInsurances)
router.get("/fetch-pet-medications", fetchPetMedications)
router.get("/fetch-pet-procedures", fetchPetProcedures)

export default router
