import express from "express"
import { returnDoctorPageData } from "../controllers/public-doctor-data-CTRL"

const router = express.Router()

router.get("/:id", returnDoctorPageData)

export default router