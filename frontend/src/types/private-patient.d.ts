declare global {
	interface PatientDashboardData extends DashboardDataType {
		doctorFirstName: string
		doctorLastName: string
	}

	type PetMedications = {
		petMedicationsId: number
		frequencyPeriod: string
		frequencyCount: number
	}

	type PetProcedures = {
		petProcedureId: number
		procedureDate: MysqlTimestamp
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
