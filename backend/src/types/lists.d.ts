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
    service_and_category_listID: number
    Category_name: string
    Service_name: string
  }

  type ServicedPetItem = {
    pet_listID: number
    pet: string
    petType: string
  }

  type PreVetSchool = {
    pre_vet_school_listID: number
    School_name: string
  }

  type Major = {
    major_listID: number
    Major_name: string
  }

  type PreVetEducationType = {
    pre_vet_education_typeID: number
    Education_type: string
  }

  type VetSchool = {
    vet_school_listID: number
    School_name: string
  }

  type VetEducationType = {
    vet_education_typeID: number
    Education_type: string
  }

  type InsuranceItem = {
    insurance_listID: number
    Insurance_name: string
  }

  type LanguageItem = {
    language_listID: number
    Language_name: string
  }

}

export {}
