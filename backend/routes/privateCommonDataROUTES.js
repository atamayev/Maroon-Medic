import express from "express";
import { headerData, UUIDtoID } from "../controllers/privateCommonDataCTRL.js";

const router = express.Router()

router.post("/header-data", headerData)
router.post("/uuid-to-id", UUIDtoID)


export default router
