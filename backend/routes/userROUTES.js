import express from "express";
import { fetchUsers, getUser, returnVetPageData} from "../controllers/userCTRL.js";

const router = express.Router()

router.get("/fetchUsers", fetchUsers)
// router.get("/:id", getUser)
router.get("/:id", returnVetPageData)

export default router