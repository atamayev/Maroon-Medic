import express from "express"
import {
	fetchDoctorLists,
	fetchPatientLists,
	fetchPetTypes,
	fetchInsurances

} from "../controllers/lists-CTRL"

const router = express.Router()

router.get("/fetch-doctor-lists", fetchDoctorLists)
router.get("/fetch-patient-lists", fetchPatientLists)
router.get("/fetch-pet-types", fetchPetTypes)
router.get("/fetch-insurances", fetchInsurances)

export default router
