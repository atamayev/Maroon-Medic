import express from "express";
import { fetchUsers, getUser} from "../controllers/userCTRL.js";

const router = express.Router()

router.get("/fetchUsers", fetchUsers)
router.get("/:id", getUser)

export default router