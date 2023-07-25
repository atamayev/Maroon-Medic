import express from "express"
import {
  getDoctorCalendarDetails,
  makeAppointment,
  confirmAppointment
} from "../controllers/calendar-CTRL.ts"
import GetIDFromUUID from "../utils/getIDFromUUID.ts"
const router = express.Router()

router.post("/makeAppointment", makeAppointment)
router.get("/getDoctorCalendarDetails", GetIDFromUUID.getDoctorIDFromUUID, getDoctorCalendarDetails)
router.patch("/confirm-appointment", confirmAppointment)

export default router
