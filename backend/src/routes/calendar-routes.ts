import express from "express"
import {
	getDoctorCalendarDetails,
	makeAppointment,
	confirmAppointment
} from "../controllers/calendar-controller"
import GetIDFromUUID from "../middleware/get-id-from-uuid"

const router = express.Router()

router.post("/make-appointment", GetIDFromUUID.patient, makeAppointment)
router.get("/get-doctor-calendar-details", GetIDFromUUID.doctor, getDoctorCalendarDetails)
router.patch("/confirm-appointment", GetIDFromUUID.doctor, confirmAppointment)

export default router
