declare global {
  interface DoctorListDetails {
    languages: LanguageItem[]
    servicesAndCategories: ServiceListItem[]
    specialties: SpecialtyItem[]
    preVetSchools: PreVetSchool[]
    preVetEducationTypes: PreVetEducationType[]
    majors: Major[]
    vetSchools: VetSchoolList[]
    vetEducationTypes: VetEducationType[]
    pets: ServicedPetItem[]
  }

  interface PatientListDetails {
    languages: LanguageItem[]
  }

  type ServiceListItem = {
    service_and_category_listID: number
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

  type VetSchoolList = {
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

  type SpecialtyItem = {
    specialtiesListId: number
    organizationName: string
    specialtyName: string
  }

  type LanguageItem = {
    languageListId: number
    languageName: string
  }
}

export {}
