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
    pre_vet_school_listID: number
    schoolName: string
  }

  type Major = {
    major_listID: number
    majorName: string
  }

  type PreVetEducationType = {
    pre_vet_education_typeID: number
    educationType: string
  }

  type VetSchool = {
    vet_school_listID: number
    schoolName: string
  }

  type VetEducationType = {
    vet_education_typeID: number
    educationType: string
  }

  type InsuranceItem = {
    insurance_listID: number
    insurance_name: string
  }

  type LanguageItem = {
    languageListId: number
    languageName: string
  }
}

export {}
