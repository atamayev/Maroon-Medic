import express from "express";
import { UUIDtoID } from "../controllers/privateCommonDataCTRL.js";

const router = express.Router()

// router.post("/header-data", headerData)
router.post("/uuid-to-id", UUIDtoID)
// router.post("/check-uuid", checkUUID)


export default router
