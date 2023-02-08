import express from "express";
import { newDoctor, dashboardData } from "../controllers/privateDataCTRL.js";

const router = express.Router()

router.post("/new-doctor", newDoctor)
router.get("/dashboard-data", dashboardData)


export default router
