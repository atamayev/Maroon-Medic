import express from "express";
import { newPatient, dashboardData} from "../controllers/privatePatientDataCTRL.js";

const router = express.Router()

router.post("/new-patient", newPatient)
router.get("/dashboard-data", dashboardData)


export default router
