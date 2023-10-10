import express from "express"
import {
	getDoctorCalendarDetails,
	makeAppointment,
	confirmAppointment,
	denyAppointment
} from "../controllers/calendar-controller"
import GetIDFromUUID from "../middleware/get-id-from-uuid"

const router = express.Router()

router.post("/make-appointment", GetIDFromUUID.patient, makeAppointment)
router.get("/get-doctor-calendar-details", GetIDFromUUID.doctor, getDoctorCalendarDetails)
router.patch("/confirm-appointment", GetIDFromUUID.doctor, confirmAppointment)
router.patch("/deny-appointment", GetIDFromUUID.doctor, denyAppointment)

export default router
