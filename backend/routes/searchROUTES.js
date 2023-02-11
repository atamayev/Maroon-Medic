import express from "express";
import { searchByQuery, fetchUsers} from "../controllers/searchCTRL.js";

const router = express.Router()

router.get("/s/:query", searchByQuery)
router.get("/fetchAllUsers", fetchUsers)


export default router
