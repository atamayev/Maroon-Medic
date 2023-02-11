import express from "express";
import { returnDoctorPageData} from "../controllers/publicDoctorDataCTRL.js";

const router = express.Router()

router.get("/:id", returnDoctorPageData)

export default router
