declare global {
	interface AppointmentObject {
		serviceAndCategoryListId: number
		appointmentDate: string
		appointmentTime: string
		appointmentTimespan: number
		appointmentPrice: number
		nvi: number
		addressesId: number
		instantBook: boolean
		message: string
		selectedPetId: number
	}
}

export {}
