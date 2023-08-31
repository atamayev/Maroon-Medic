import express from "express"
import { returnDoctorPageData } from "../controllers/public-doctor-data-controller"

const router = express.Router()

router.get("/:NVI", returnDoctorPageData)

export default router
