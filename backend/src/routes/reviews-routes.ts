import express from "express"
import {
	addDoctorReviewResponse,
	addReview,
	addReviewReaction,
	addSpecialtyReview,
	deleteDoctorReviewResponse,
	deleteReview,
	deleteReviewReaction,
	deleteSpecialtyReview,
	updateDoctorReviewResponse,
	updateReview,
	updateReviewReaction,
	updateSpecialtyReview
} from "../controllers/reviews-controller"
import GetIdFromUuid from "../middleware/get-id-from-uuid"

const reviewsRoutes = express.Router()

//get patient id from uuid, and also a req.body validator
reviewsRoutes.post("/add-review", GetIdFromUuid.patient, addReview)
reviewsRoutes.patch("/update-review", GetIdFromUuid.patient, updateReview)
reviewsRoutes.delete("/delete-review", GetIdFromUuid.patient, deleteReview)

reviewsRoutes.post("/add-doctor-review-response", GetIdFromUuid.doctor, addDoctorReviewResponse)
reviewsRoutes.patch("/update-doctor-review-response", GetIdFromUuid.doctor, updateDoctorReviewResponse)
reviewsRoutes.delete("/delete-doctor-review-response", GetIdFromUuid.doctor, deleteDoctorReviewResponse)

reviewsRoutes.post("/add-review-reaction", GetIdFromUuid.patient, addReviewReaction)
reviewsRoutes.patch("/update-review-reaction", GetIdFromUuid.patient, updateReviewReaction)
reviewsRoutes.delete("/delete-review-reaction", GetIdFromUuid.patient, deleteReviewReaction)

reviewsRoutes.post("/add-specialty-review", GetIdFromUuid.patient, addSpecialtyReview)
reviewsRoutes.patch("/update-specialty-review", GetIdFromUuid.patient, updateSpecialtyReview)
reviewsRoutes.delete("/delete-specialty-review", GetIdFromUuid.patient, deleteSpecialtyReview)

export default reviewsRoutes
