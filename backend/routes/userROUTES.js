import express from "express";
import { fetchUsers, returnVetPageData, DoctorUUIDtoDoctorID} from "../controllers/userCTRL.js";

const router = express.Router()

router.get("/fetchUsers", fetchUsers)
router.get("/:id", returnVetPageData)
router.post("/doctoruuid-to-doctorid", DoctorUUIDtoDoctorID)

export default router