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

	interface PublicDoctorAccountDetails {
		doctorLanguages: LanguageName[]
		doctorServices: DetailedServiceItem[]
		doctorSpecialties: OrganizationSpecialtyName[]
		doctorPreVetEducation: PreVetEducation[]
		doctorVetEducation: VetEducation[]
		doctorAddressData: PublicAddressData[]
		description: string
		servicedPets: ServicedPetData[]
		doctorPersonalInfo: DoctorPersonalInfo
	}
}

export {}
