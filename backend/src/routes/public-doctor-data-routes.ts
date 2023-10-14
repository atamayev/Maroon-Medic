import express from "express"
import { returnDoctorPageData } from "../controllers/public-doctor-data-controller"

const publicDoctorDataRoutes = express.Router()

publicDoctorDataRoutes.get("/:NVI", returnDoctorPageData)

export default publicDoctorDataRoutes
