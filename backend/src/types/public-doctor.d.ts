declare global {
	type LanguageName = {
		languageName: string
	}

	type OrganizationSpecialtyName = {
		organizationName: string
		specialtyName: string
	}

	type ServicedPetData = {
		pet: string
		petType: string
	}

	type PublicAddressData = AddressData & {
		phone: string
		times: DoctorAvailability[]
	}

	type PublicPreVetEducation = EducationItem & {
		majorName: string
	}

	interface PublicDoctorAccountDetails {
		doctorLanguages: LanguageName[]
		doctorServices: DetailedServiceItem[]
		doctorSpecialties: OrganizationSpecialtyName[]
		doctorPreVetEducation: PublicPreVetEducation[]
		doctorVetEducation: EducationItem[]
		doctorAddressData: PublicAddressData[]
		description: string
		servicedPets: ServicedPetData[]
		doctorPersonalInfo: DoctorPersonalInfo
		reviews: PublicDoctorReview[]
	}
}

export {}
