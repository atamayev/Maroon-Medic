import express from "express";
import { fetchUsers, returnVetPageData, proprietaryHomePageData} from "../controllers/userCTRL.js";

const router = express.Router()

router.get("/fetchUsers", fetchUsers)
router.get("/:id", returnVetPageData)
router.post("/proprietary-home-page-data", proprietaryHomePageData)

export default router