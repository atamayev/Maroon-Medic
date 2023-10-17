import { Response, Request } from "express"
import OperationHandler from "../utils/operation-handler"
import ReviewsDb from "../db/reviews-db"

export async function addReview (req: Request, res: Response): Promise<void> {
	const patientId = req.patientId
	const newReviewObject = req.body.newReviewObject as NewReview

	const operation: () => Promise<void> = async () => await ReviewsDb.addReview(newReviewObject, patientId)
	await OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
}

export async function updateReview (req: Request, res: Response): Promise<void> {
	const newReviewObject = req.body.newReviewObject as NewReview

	const operation: () => Promise<void> = async () => await ReviewsDb.updateReview(newReviewObject)
	await OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
}

export async function deleteReview (req: Request, res: Response): Promise<void | Response> {
	const reviewId = Number(req.params.reviewId)
	if (isNaN(reviewId)) return res.status(400).json({ error: "Invalid reviewId" })

	const operation: () => Promise<void> = async () => await ReviewsDb.deleteReview(reviewId)
	await OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
}

export async function addDoctorReviewResponse (req: Request, res: Response): Promise<void> {
	const newDoctorReviewResponse = req.body.newDoctorReviewResponse as DoctorReviewResponse

	const operation: () => Promise<void> = async () => await ReviewsDb.addDoctorReviewResponse(newDoctorReviewResponse)
	await OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
}

export async function updateDoctorReviewResponse (req: Request, res: Response): Promise<void> {
	const newDoctorReviewResponse = req.body.newDoctorReviewResponse as DoctorReviewResponse

	const operation: () => Promise<void> = async () => await ReviewsDb.updateDoctorReviewResponse(newDoctorReviewResponse)
	await OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
}

export async function deleteDoctorReviewResponse (req: Request, res: Response): Promise<void | Response> {
	const reviewId = Number(req.params.reviewId)
	if (isNaN(reviewId)) return res.status(400).json({ error: "Invalid reviewId" })

	const operation: () => Promise<void> = async () => await ReviewsDb.deleteDoctorReviewResponse(reviewId)
	await OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
}

export async function addReviewReaction (req: Request, res: Response): Promise<void> {
	const newReviewReaction = req.body.newReviewReaction as NewReviewReaction

	const operation: () => Promise<void> = async () => await ReviewsDb.addReviewReaction(newReviewReaction)
	await OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
}

export async function updateReviewReaction (req: Request, res: Response): Promise<void> {
	const newReviewReaction = req.body.newReviewReaction as NewReviewReaction

	const operation: () => Promise<void> = async () => await ReviewsDb.updateReviewReaction(newReviewReaction)
	await OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
}

export async function deleteReviewReaction (req: Request, res: Response): Promise<void | Response> {
	const reviewId = Number(req.params.reviewId)
	if (isNaN(reviewId)) return res.status(400).json({ error: "Invalid reviewId" })

	const operation: () => Promise<void> = async () => await ReviewsDb.deleteReviewReaction(reviewId)
	await OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
}

export async function addSpecialtyReview (req: Request, res: Response): Promise<void> {
	const patientId = req.patientId
	const newSpecialtyReview = req.body.newSpecialtyReview as NewSpecialtyReview

	const operation: () => Promise<void> = async () => await ReviewsDb.addSpecialtyReview(newSpecialtyReview, patientId)
	await OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
}

export async function updateSpecialtyReview (req: Request, res: Response): Promise<void> {
	const newSpecialtyReview = req.body.newSpecialtyReview as NewSpecialtyReview

	const operation: () => Promise<void> = async () => await ReviewsDb.updateSpecialtyReview(newSpecialtyReview)
	await OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
}

export async function deleteSpecialtyReview (req: Request, res: Response): Promise<void | Response> {
	const reviewId = Number(req.params.reviewId)
	if (isNaN(reviewId)) return res.status(400).json({ error: "Invalid reviewId" })

	const operation: () => Promise<void> = async () => await ReviewsDb.deleteSpecialtyReview(reviewId)
	await OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
}
