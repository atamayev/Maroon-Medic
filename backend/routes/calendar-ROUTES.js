import express from "express"
import {
  getDoctorCalendarDetails,
  makeAppointment,
  confirmAppointment
} from "../controllers/calendar-CTRL.js"
import GetIDFromUUID from "../utils/getIDFromUUID.js"
const router = express.Router()

router.post("/makeAppointment", makeAppointment)
router.get("/getDoctorCalendarDetails", GetIDFromUUID.getDoctorIDFromUUID, getDoctorCalendarDetails)
router.post("/confirm-appointment", confirmAppointment)

export default router
