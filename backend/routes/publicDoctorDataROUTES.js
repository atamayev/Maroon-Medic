import express from "express";
import { returnDoctorPageData, UUIDtoID} from "../controllers/publicDoctorDataCTRL.js";

const router = express.Router()

router.get("/:id", returnDoctorPageData)
router.post("/uuid-to-id", UUIDtoID)

export default router
