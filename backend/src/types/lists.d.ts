declare global {
	interface DoctorListDetails {
		languages: LanguageItem[]
		servicesAndCategories: ServiceListItem[]
		specialties: OrganizationSpecialty[]
		preVetSchools: PreVetSchool[]
		preVetEducationTypes: PreVetEducationType[]
		majors: Major[]
		vetSchools: VetSchool[]
		vetEducationTypes: VetEducationType[]
		pets: ServicedPetItem[]
	}

	interface PatientListDetails {
		languages: LanguageItem[]
	}

	type ServiceListItem = {
		serviceAndCategoryListId: number
		categoryName: string
		serviceName: string
	}

	type ServicedPetItem = {
		petListId: number
		pet: string
		petType: string
	}

	type PreVetSchool = {
		preVetSchoolListId: number
		schoolName: string
	}

	type Major = {
		majorListId: number
		majorName: string
	}

	type PreVetEducationType = {
		preVetEducationTypeId: number
		educationType: string
	}

	type VetSchool = {
		vetSchoolListId: number
		schoolName: string
	}

	type VetEducationType = {
		vetEducationTypeId: number
		educationType: string
	}

	type InsuranceItem = {
		insuranceListId: number
		insuranceName: string
	}

	type LanguageItem = {
		languageListId: number
		languageName: string
	}
}

export {}
