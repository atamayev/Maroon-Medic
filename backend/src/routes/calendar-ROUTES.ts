import express from "express"
import {
	getDoctorCalendarDetails,
	makeAppointment,
	confirmAppointment
} from "../controllers/calendar-CTRL"
import GetIDFromUUID from "../utils/getIDFromUUID"
const router = express.Router()

router.post("/make-appointment", makeAppointment)
router.get("/get-doctor-calendar-details", GetIDFromUUID.doctor, getDoctorCalendarDetails)
router.patch("/confirm-appointment", confirmAppointment)

export default router
