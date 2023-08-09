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
    Category_name: string
    Service_name: string
  }

  type ServicedPetItem = {
    pet_listID: number
    Pet: string
    Pet_type: string
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

  type VetSchoolList = {
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

  type SpecialtyItem = {
    specialties_listID: number
    Organization_name: string
    Specialty_name: string
  }

  type LanguageItem = {
    language_listID: number
    Language_name: string
  }
}

export {}
