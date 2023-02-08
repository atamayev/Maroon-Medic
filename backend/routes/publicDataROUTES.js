import express from "express";
import { returnDoctorPageData, DoctorUUIDtoDoctorID} from "../controllers/publicDataCTRL.js";

const router = express.Router()

router.get("/:id", returnDoctorPageData)
router.post("/doctoruuid-to-doctorid", DoctorUUIDtoDoctorID)

export default router