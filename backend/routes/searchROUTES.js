import express from "express";
import { searchByQuery} from "../controllers/searchCTRL.js";

const router = express.Router()

router.get("/:query", searchByQuery)


export default router
