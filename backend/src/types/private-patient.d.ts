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
		petMedictions: PetMedications[]
		petProcedures: PetProcedures[]
	}

	type PetMedications = {
		petMedicationsId: number
		frequencyPeriod: string
		frequencyCount: string
	}

	type PetProcedures = {
		petProcedureId: number
		procedureDate: MysqlTimestamp
	}

	type PetMedicationsPreProcessed = {
		petMedicationsListId: number
		frequencyPeriod: string
		frequencyCount: string
	}

	type PetProceduresPreProcessed = {
		petProceduresListId: number
		procedureDate: MysqlTimestamp
	}

	type PetItemForCreation = {
		name: string
		gender: string
		dateOfBirth: string
		pet: string
		petType: string
		insuranceName: string
		petListId: number
		insuranceListId: number
	}

	type PetItemForCreationPreProcessed = PetItemForCreationPreProcessed & {
		petMedications: PetMedicationsPreProcessed[]
		petProcedures: PetProceduresPreProcessed[]
	}

	type PetItemForCreationPostProcessed = PetItemForCreationPreProcessed & {
		petMedications: PetMedications[]
		petProcedures: PetProcedures[]
	}
}

export {}
