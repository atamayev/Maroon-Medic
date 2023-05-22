import express from "express";
import { getDoctorCalendarDetails } from "../controllers/calendarCTRL.js";

const router = express.Router()

router.get("/getDoctorCalendarDetails", getDoctorCalendarDetails)

export default router
