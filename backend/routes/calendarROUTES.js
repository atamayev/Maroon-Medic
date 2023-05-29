import express from "express";
import { 
    getDoctorCalendarDetails,
    makeAppointment
} from "../controllers/calendarCTRL.js";

const router = express.Router()

router.post("/makeAppointment", makeAppointment)
router.get("/getDoctorCalendarDetails", getDoctorCalendarDetails)

export default router
