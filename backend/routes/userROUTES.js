import express from "express";
import { fetchUsers, returnVetPageData, UUIDtoDoctorID} from "../controllers/userCTRL.js";

const router = express.Router()

router.get("/fetchUsers", fetchUsers)
router.get("/:id", returnVetPageData)
router.post("/uuid-to-doctorid", UUIDtoDoctorID)

export default router