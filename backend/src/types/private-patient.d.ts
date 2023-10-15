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
		petMedictions: PetMedication[]
		petProcedures: PetProcedure[]
	}

	type PetMedication = {
		petMedicationId: number
		frequencyPeriod: string
		frequencyCount: string
	}

	type PetProcedure = {
		petProcedureId: number
		procedureDate: MysqlTimestamp
	}

	type PetMedicationPreProcessed = {
		petMedicationListId: number
		frequencyPeriod: string
		frequencyCount: string
	}

	type PetProcedurePreProcessed = {
		petProcedureListId: number
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
		petMedications: PetMedicationPreProcessed[]
		petProcedures: PetProcedurePreProcessed[]
	}

	type PetItemForCreationPostProcessed = PetItemForCreationPreProcessed & {
		petMedications: PetMedication[]
		petProcedures: PetProcedure[]
	}
}

export {}
