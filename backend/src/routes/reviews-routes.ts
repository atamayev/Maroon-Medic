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
import validateNewReviewRequestBody from "../middleware/request-validation/reviews-routes/validate-new-review-request-body"
import validateNewReviewResponseRequestBody from "../middleware/request-validation/reviews-routes/validate-new-review-response-request-body"
import validateNewReviewReactionRequestBody from "../middleware/request-validation/reviews-routes/validate-new-review-reaction-request-body"
import validateNewSpecialtyReviewResponseBody
	from "../middleware/request-validation/reviews-routes/validate-new-specialty-review-request-body"

const reviewsRoutes = express.Router()

//get patient id from uuid, and also a req.body validator
reviewsRoutes.post("/add-review", GetIdFromUuid.patient, validateNewReviewRequestBody, addReview)
reviewsRoutes.patch("/update-review", GetIdFromUuid.patient,validateNewReviewRequestBody, updateReview)
reviewsRoutes.delete("/delete-review/:reviewId", GetIdFromUuid.patient, deleteReview)

reviewsRoutes.post("/add-doctor-review-response", GetIdFromUuid.doctor, validateNewReviewResponseRequestBody, addDoctorReviewResponse)
reviewsRoutes.patch("/update-doctor-review-response", GetIdFromUuid.doctor, updateDoctorReviewResponse)
reviewsRoutes.delete("/delete-doctor-review-response/:reviewId", GetIdFromUuid.doctor, deleteDoctorReviewResponse)

reviewsRoutes.post("/add-review-reaction", GetIdFromUuid.patient, validateNewReviewReactionRequestBody, addReviewReaction)
reviewsRoutes.patch("/update-review-reaction", GetIdFromUuid.patient, validateNewReviewReactionRequestBody, updateReviewReaction)
reviewsRoutes.delete("/delete-review-reaction/:reviewId", GetIdFromUuid.patient, deleteReviewReaction)

reviewsRoutes.post("/add-specialty-review", GetIdFromUuid.patient, validateNewSpecialtyReviewResponseBody, addSpecialtyReview)
reviewsRoutes.patch("/update-specialty-review", GetIdFromUuid.patient, validateNewSpecialtyReviewResponseBody, updateSpecialtyReview)
reviewsRoutes.delete("/delete-specialty-review/:reviewId", GetIdFromUuid.patient, deleteSpecialtyReview)

export default reviewsRoutes
