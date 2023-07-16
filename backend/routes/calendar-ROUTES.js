import express from "express"
import {
  getDoctorCalendarDetails,
  makeAppointment,
  confirmAppointment
} from "../controllers/calendar-CTRL.js"

const router = express.Router()

router.post("/makeAppointment", makeAppointment)
router.get("/getDoctorCalendarDetails", getDoctorCalendarDetails)
router.post("/confirm-appointment", confirmAppointment)

export default router
