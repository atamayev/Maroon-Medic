import express from "express";
import { headerData } from "../controllers/publicDataCTRL.js";

const router = express.Router()

router.post("/header-data", headerData)


export default router
