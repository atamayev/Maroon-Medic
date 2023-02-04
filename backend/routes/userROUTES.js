import express from "express";
import { returnVetPageData, DoctorUUIDtoDoctorID} from "../controllers/userCTRL.js";

const router = express.Router()

router.get("/:id", returnVetPageData)
router.post("/doctoruuid-to-doctorid", DoctorUUIDtoDoctorID)

export default router