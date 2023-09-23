declare global {
	interface PatientDashboardData extends DashboardDataType {
		doctorFirstName: string
		doctorLastName: string
	}

	interface PatientAccountDetails {
		languages: LanguageItem[]
	}

	interface PetDetails {
		name: string
		gender: string
		dateOfBirth: MysqlTimestamp
		petListId: number
	}

	interface CompletePetInfo {
		name: string
		gender: string
		dateOfBirth: string
		pet: string
		petType: string
		petInfoId: number
		insuranceName: string
	}
}

export {}
