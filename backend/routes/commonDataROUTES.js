import express from "express";
import { UUIDtoID } from "../controllers/CommonDataCTRL.js";

const router = express.Router()

router.post("/uuid-to-id", UUIDtoID)

export default router
