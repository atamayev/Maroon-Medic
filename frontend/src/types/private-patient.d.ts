declare global {
	interface PatientDashboardData extends DashboardDataType {
		doctorFirstName: string
		doctorLastName: string
	}

	type PetMedication = {
		petMedicationListId: number
		frequencyCount: string
		frequencyPeriod: string
	}

	type NewPetMedicationItem  = PetMedication & {
		id: number
		showFrequencyAndTimePeriod: boolean
	}

	type PetProcedure = {
		petProcedureListId: number
		procedureDate: MysqlTimestamp
	}

	type NewPetProcedureItem = PetProcedure & {
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
		petMedications: PetMedication[]
		petProcedures: PetProcedure[]
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
