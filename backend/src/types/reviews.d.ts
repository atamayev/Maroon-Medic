declare global {
	type NewReview = {
		appointmentId: number
		petInfoId: number
		patientId: number
		doctorId: number
		patientReviewMessage?: string
		patientReviewRating: number
	}

	type DoctorReviewResponse = {
		reviewId: number
		doctorReviewResponse: string
	}

	type NewReviewReaction = {
		reviewId: number
		reviewReaction: boolean
	}

	type NewSpecialtyReview = {
		reviewId: number
		specialtyReviewCategoryId: number
		patientId: number
		specialtyReviewMessage?: string
		specialtyReviewRating: number
	}

	type PublicDoctorReview = {
		reviewId: number
		patientFirstName: string
		patientLastName: string
		patientReviewMessage?: string
		patientReviewRating: number
		doctorReviewResponse?: string
		positiveReviewReactions?: number
		negativeReviewReactions?: number
	}
}

export {}
