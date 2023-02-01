import express from "express";
import { newVet, dashboardData } from "../controllers/profileCTRL.js";

const router = express.Router()

router.post("/new-vet", newVet)
router.get("/dashboard-data", dashboardData)


export default router
