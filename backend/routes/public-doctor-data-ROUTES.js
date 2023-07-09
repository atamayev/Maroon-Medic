import express from "express"
import { returnDoctorPageData } from "../controllers/public-doctor-data-CTRL.js"

const router = express.Router()

router.get("/:id", returnDoctorPageData)

export default router
