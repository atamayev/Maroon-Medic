declare global {
	interface AppointmentObject {
		appointmentPrice: number
		appointmentTimespan: number
		message: string
		instantBook: boolean
		serviceAndCategoryListId: number
		selectedPetId: number
		addressesId: number
		nvi: number
		appointmentDate: string
		appointmentTime: string
	}
}

export {}
