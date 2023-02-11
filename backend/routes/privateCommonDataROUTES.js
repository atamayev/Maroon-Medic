import express from "express";
import { headerData } from "../controllers/privateCommonDataCTRL.js";

const router = express.Router()

router.post("/header-data", headerData)


export default router
