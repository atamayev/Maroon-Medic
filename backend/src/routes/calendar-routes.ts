import express from "express"
import {
	getDoctorCalendarDetails,
	makeAppointment,
	confirmAppointment,
	denyAppointment
} from "../controllers/calendar-controller"
import GetIDFromUUID from "../middleware/get-id-from-uuid"
import validateMakeAppointmentRequestBody from "../middleware/calendar-routes-request-validation/validate-make-appointment-request-body"

const calendarRoutes = express.Router()

calendarRoutes.post("/make-appointment", GetIDFromUUID.patient, validateMakeAppointmentRequestBody, makeAppointment)
calendarRoutes.get("/get-doctor-calendar-details", GetIDFromUUID.doctor, getDoctorCalendarDetails)
calendarRoutes.patch("/confirm-appointment/:appointmentId", GetIDFromUUID.doctor, confirmAppointment)
calendarRoutes.patch("/deny-appointment/:appointmentId", GetIDFromUUID.doctor, denyAppointment)

export default calendarRoutes
