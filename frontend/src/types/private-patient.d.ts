declare global {
	interface PatientDashboardData extends DashboardDataType {
		doctorFirstName: string
		doctorLastName: string
	}

	type PetMedications = {
		petMedicationsListId: number
		frequencyCount: string
		frequencyPeriod: string
	}

	type NewPetMedicationsItem  = PetMedications & {
		id: number
		showFrequencyAndTimePeriod: boolean
	}

	type PetProcedures = {
		petProceduresListId: number
		procedureDate: MysqlTimestamp
	}

	type NewPetProceduresItem = PetProcedures & {
		id: number
		showDate: boolean
	}

	interface BasePetInfo {
		name: string
		gender: string
		dateOfBirth: string
		pet: string
		petType: string
		insuranceName: string
		petMedications: PetMedications[]
		petProcedures: PetProcedures[]
	}

	//This is the type for the pet data when it is being 'created' (not saved)
	type PetItemForCreation = BasePetInfo & {
		petListId: number
		insuranceListId: number
	}

	//This is the type for the pet data when it already saved
	type SavedPetItem = BasePetInfo & {
		petInfoId: number
	}

	interface PatientAccountDetails {
		languages: LanguageItem[]
	}
}

export {}
