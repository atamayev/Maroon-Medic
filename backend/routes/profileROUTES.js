import express from "express";
import { newVet } from "../controllers/profileCTRL.js";

const router = express.Router()

router.post("/new-vet", newVet)


export default router
