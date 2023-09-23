declare global {
	interface DoctorDashboardData extends DashboardDataType {
		patientFirstName: string
		patientLastName: string
	}

	interface DoctorCalendarEvent {
		title: string
		start: Date
		end: Date
		doctorConfirmationStatus: boolean
	}

	type ServiceItem = {
		serviceAndCategoryListId: number
		serviceTime: string
		categoryName: string
		serviceName: string
	}

	interface ServiceItemNullablePrice extends ServiceItem {
		servicePrice: number | null
	}

	interface ServiceItemNotNullablePrice extends ServiceItem{
		servicePrice: number
	}

	interface VetEducationData {
		schoolId: number
		educationTypeId: number
		startDate: string
		endDate: string
	}

	interface PreVetEducationData extends VetEducationData {
		majorId: number
	}

	interface EducationBase {
		schoolName: string
		educationType: string
		startDate: string
		endDate: string
	}

	type GeneralEducationItem = EducationBase & {
		majorName?: string
	}

	type PreVetEducationItem = EducationBase & {
		preVetEducationMappingId: number
		majorName: string
	}

	type VetEducationItem = EducationBase & {
		vetEducationMappingId: number
	}

	interface DoctorAccountDetails {
		languages: LanguageItem[]
		services: ServiceItemNotNullablePrice[]
		specialties: SpecialtyItem[]
		preVetEducation: PreVetEducationItem[]
		vetEducation: VetEducationItem[]
		addressData: DoctorAddressData[]
		description: string
		servicedPets: ServicedPetItem[]
		verified: boolean
		publiclyAvailable: boolean
	}
}

export {}
