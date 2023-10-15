import express from "express"
import {
	fetchDoctorLists,
	fetchPatientLists,
	fetchPetTypes,
	fetchInsurances,
	fetchPetMedications,
	fetchPetProcedures
} from "../controllers/lists-controller"
import GetIdFromUuid from "../middleware/get-id-from-uuid"

const listsRoutes = express.Router()

//GetID From UUID is used to make sure the user is logged in (to make sure randos can't access the lists)
listsRoutes.get("/fetch-doctor-lists", GetIdFromUuid.doctor, fetchDoctorLists)
listsRoutes.get("/fetch-patient-lists", GetIdFromUuid.patient, fetchPatientLists)
listsRoutes.get("/fetch-pet-types", GetIdFromUuid.patient, fetchPetTypes)
listsRoutes.get("/fetch-insurances", GetIdFromUuid.patient, fetchInsurances)
listsRoutes.get("/fetch-pet-medications", GetIdFromUuid.patient, fetchPetMedications)
listsRoutes.get("/fetch-pet-procedures", GetIdFromUuid.patient, fetchPetProcedures)

export default listsRoutes
