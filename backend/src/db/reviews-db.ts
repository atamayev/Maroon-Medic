
import { mysqlTables } from "../utils/table-names-list"
import { connectDatabase } from "../setup-and-security/connect"

export default new class ReviewsDB {
	//Standard Reviews:
	async addReview(reviewInfo: NewReview, patientId: number): Promise<void> {
		const sql = `INSERT INTO ${mysqlTables.reviews}
			(appointments_id, pet_info_id, patient_id, doctor_id, patient_review_message, patient_review_rating)
			VALUES (?, ?, ?, ?, ?, ?)`
		const values = [reviewInfo.appointmentId, reviewInfo.petInfoId, patientId,
			reviewInfo.doctorId, reviewInfo.patientReviewMessage, reviewInfo.patientReviewRating]
		const connection = await connectDatabase()
		await connection.execute(sql, values)
	}

	async updateReview(reviewInfo: NewReview): Promise<void> {
		const sql = `UPDATE ${mysqlTables.reviews}
			SET patient_review_message = ?, patient_review_rating = ?
			WHERE review_id = ?`
		const values = [reviewInfo.patientReviewMessage, reviewInfo.patientReviewRating, reviewInfo.appointmentId]
		const connection = await connectDatabase()
		await connection.execute(sql, values)
	}

	async deleteReview(reviewId: number): Promise<void> {
		const sql = `UPDATE ${mysqlTables.reviews} SET is_active = 0 WHERE review_id = ?`
		const values = [reviewId]
		const connection = await connectDatabase()
		await connection.execute(sql, values)
	}

	// Doctor Review Response:
	async addDoctorReviewResponse(doctorReviewResponse: DoctorReviewResponse): Promise<void> {
		const sql = `INSERT INTO ${mysqlTables.reviews}
			(review_id, doctor_review_response)
			VALUES (?, ?)`
		const values = [doctorReviewResponse.reviewId, doctorReviewResponse.doctorReviewResponse]
		const connection = await connectDatabase()
		await connection.execute(sql, values)
	}

	async updateDoctorReviewResponse(doctorReviewResponse: DoctorReviewResponse): Promise<void> {
		const sql = `UPDATE ${mysqlTables.doctor_review_responses} SET doctor_review_response = ? WHERE review_id = ?`
		const values = [doctorReviewResponse.doctorReviewResponse, doctorReviewResponse.reviewId]
		const connection = await connectDatabase()
		await connection.execute(sql, values)
	}

	async deleteDoctorReviewResponse(reviewId: number): Promise<void> {
		const sql = `UPDATE ${mysqlTables.doctor_review_responses} SET is_active = 0 WHERE review_id = ?`
		const values = [reviewId]
		const connection = await connectDatabase()
		await connection.execute(sql, values)
	}

	//ReviewReactions:

	async addReviewReaction(reviewReactionInfo: NewReviewReaction): Promise<void> {
		const sql = `INSERT INTO ${mysqlTables.review_reactions}
			(review_id, review_reaction)
			VALUES (?, ?)`
		const values = [reviewReactionInfo.reviewId, reviewReactionInfo.reviewReaction]
		const connection = await connectDatabase()
		await connection.execute(sql, values)
	}

	async updateReviewReaction(reviewReactionInfo: NewReviewReaction): Promise<void> {
		const sql = `UPDATE ${mysqlTables.review_reactions} SET review_reaction = ? WHERE review_id = ?`
		const values = [reviewReactionInfo.reviewReaction, reviewReactionInfo.reviewId]
		const connection = await connectDatabase()
		await connection.execute(sql, values)
	}

	async deleteReviewReaction(reviewId: number): Promise<void> {
		const sql = `UPDATE ${mysqlTables.review_reactions} SET is_active = 0 WHERE review_id = ?`
		const values = [reviewId]
		const connection = await connectDatabase()
		await connection.execute(sql, values)
	}

	//SpecialtyReviews:

	async addSpecialtyReview(specialtyReviewInfo: NewSpecialtyReview, patientId: number): Promise<void> {
		const sql = `INSERT INTO ${mysqlTables.specialty_reviews}
			(review_id, specialty_review_category_id, patient_id, specialty_review_message, specialty_review_rating)
			VALUES (?, ?, ?, ?, ?)`
		const values = [specialtyReviewInfo.reviewId, specialtyReviewInfo.specialtyReviewCategoryId,
			patientId, specialtyReviewInfo.specialtyReviewMessage, specialtyReviewInfo.specialtyReviewRating]
		const connection = await connectDatabase()
		await connection.execute(sql, values)
	}

	async updateSpecialtyReview(specialtyReviewInfo: NewSpecialtyReview): Promise<void> {
		const sql = `UPDATE ${mysqlTables.specialty_reviews}
			SET specialty_review_message = ?, specialty_review_rating = ?
			WHERE review_id = ?`
		const values = [specialtyReviewInfo.specialtyReviewMessage, specialtyReviewInfo.specialtyReviewRating,
			specialtyReviewInfo.reviewId]
		const connection = await connectDatabase()
		await connection.execute(sql, values)
	}

	async deleteSpecialtyReview(reviewId: number): Promise<void> {
		const sql = `UPDATE ${mysqlTables.specialty_reviews} SET is_active = 0 WHERE review_id = ?`
		const values = [reviewId]
		const connection = await connectDatabase()
		await connection.execute(sql, values)
	}
}
