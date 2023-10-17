import { AxiosResponse } from "axios"
import http from "../http-common"

export default new class ReviewsDataService {
	async addReview(newReviewObject: NewReview): Promise<AxiosResponse<EmptyResponse>> {
		return await http.post<EmptyResponse>("reviews/add-review", {newReviewObject})
	}
	async updateReview(newReviewObject: NewReview): Promise<AxiosResponse<EmptyResponse>> {
		return await http.patch<EmptyResponse>("reviews/update-review", {newReviewObject})
	}
	async deleteReview(reviewId: number): Promise<AxiosResponse<EmptyResponse>> {
		return await http.delete<EmptyResponse>(`reviews/delete-review/${reviewId}`)
	}

	async addDoctorReviewResponse(newDoctorReviewResponse: DoctorReviewResponse): Promise<AxiosResponse<EmptyResponse>> {
		return await http.post<EmptyResponse>("reviews/add-doctor-review-response", {newDoctorReviewResponse})
	}
	async updateDoctorReviewResponse(newDoctorReviewResponse: DoctorReviewResponse): Promise<AxiosResponse<EmptyResponse>> {
		return await http.patch<EmptyResponse>("reviews/update-doctor-review-response", {newDoctorReviewResponse})
	}
	async deleteDoctorReviewResponse(reviewId: number): Promise<AxiosResponse<EmptyResponse>> {
		return await http.delete<EmptyResponse>(`reviews/delete-doctor-review-response/${reviewId}`)
	}

	async addReviewReactionResponse(newReviewReaction: NewReviewReaction): Promise<AxiosResponse<EmptyResponse>> {
		return await http.post<EmptyResponse>("reviews/add-review-reaction", {newReviewReaction})
	}
	async updateReviewReactionResponse(newReviewReaction: NewReviewReaction): Promise<AxiosResponse<EmptyResponse>> {
		return await http.patch<EmptyResponse>("reviews/update-review-reaction", {newReviewReaction})
	}
	async deleteReviewReactionResponse(reviewId: number): Promise<AxiosResponse<EmptyResponse>> {
		return await http.delete<EmptyResponse>(`reviews/delete-review-reaction/${reviewId}`)
	}

	async addSpecialtyReview(newSpecialtyReview: NewSpecialtyReview): Promise<AxiosResponse<EmptyResponse>> {
		return await http.post<EmptyResponse>("reviews/add-specialty-review", {newSpecialtyReview})
	}
	async updateSpecialtyReview(newSpecialtyReview: NewSpecialtyReview): Promise<AxiosResponse<EmptyResponse>> {
		return await http.patch<EmptyResponse>("reviews/update-specialty-review", {newSpecialtyReview})
	}
	async deleteSpecialtyReview(reviewId: number): Promise<AxiosResponse<EmptyResponse>> {
		return await http.delete<EmptyResponse>(`reviews/delete-specialty-review/${reviewId}`)
	}
}()
