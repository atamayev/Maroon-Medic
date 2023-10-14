import express from "express"
import {
	getDoctorCalendarDetails,
	makeAppointment,
	confirmAppointment,
	denyAppointment
} from "../controllers/calendar-controller"
import GetIDFromUUID from "../middleware/get-id-from-uuid"

const calendarRoutes = express.Router()

calendarRoutes.post("/make-appointment", GetIDFromUUID.patient, makeAppointment)
calendarRoutes.get("/get-doctor-calendar-details", GetIDFromUUID.doctor, getDoctorCalendarDetails)
calendarRoutes.patch("/confirm-appointment", GetIDFromUUID.doctor, confirmAppointment)
calendarRoutes.patch("/deny-appointment", GetIDFromUUID.doctor, denyAppointment)

export default calendarRoutes
