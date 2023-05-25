import express from "express";
import { returnDoctorPageData } from "../controllers/publicDoctorData/publicDoctorDataCTRL.js";

const router = express.Router()

router.get("/:id", returnDoctorPageData)

export default router
