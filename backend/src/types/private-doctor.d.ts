declare global {
	interface DoctorDashboardData extends DashboardDataType {
		patientFirstName: string
		patientLastName: string
	}

	type DoctorPersonalInfoWithoutNVI = BasicPersonalInfo & {
		gender: string
	}

	type DoctorPersonalInfoWithoutGender = BasicPersonalInfo & {
		nvi: number
	}

	type DoctorPersonalInfo = BasicPersonalInfo & {
		nvi: number
		gender: string
	}

	interface DoctorAccountDetails {
		languages: LanguageItem[]
		services: DetailedServiceItem[]
		specialties: OrganizationSpecialty[]
		preVetEducation: PreVetEducation[]
		vetEducation: VetEducation[]
		addressData: PrivateDoctorAddressData[]
		description: string
		servicedPets: ServicedPetItem[]
		verified: boolean
		publiclyAvailable: boolean
	}

	interface EducationItem {
		schoolName: string
		educationType: string
		startDate: string
		endDate: string
	}

	type PreVetEducation = EducationItem & {
		preVetEducationMappingId: number
		majorName: string
	}

	type VetEducation = EducationItem & {
		vetEducationMappingId: number
	}

	interface AddEducationItem {
		schoolId: number
		educationTypeId: number
		startDate: string
		endDate: string
	}

	type AddPreVetEducationItem = AddEducationItem & {
		majorId: number
	}

	type DoctorStatus = {
		publiclyAvailable: boolean
		verified: boolean
	}

	type PrivateDoctorAddressLessTimesAndPhone = AddressData & {
		addressPublicStatus: boolean
	}

	type PrivateDoctorAddressLessTimes = PrivateDoctorAddressLessTimesAndPhone & {
		phone: string
	}

	type PrivateDoctorAddressData = PrivateDoctorAddressLessTimes & {
		times: DoctorAvailability[]
	}
}

export {}
