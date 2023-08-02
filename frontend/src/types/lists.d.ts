declare global {
  interface DoctorListDetailsType {
    languages: LanguageItemType[]
    servicesAndCategories: ServiceListItemType[]
    specialties: SpecialtyItemType[]
    preVetSchools: PreVetSchoolType[]
    preVetEducationTypes: PreVetEducationTypeType[]
    majors: MajorType[]
    vetSchools: VetSchoolListType[]
    vetEducationTypes: VetEducationTypeType[]
    pets: ServicedPetItemType[]
  }

  interface PatientListDetailsType {
    LanguagesList: LanguageItemType[]
  }

  type ServiceListItemType = {
    service_and_category_listID: number
    Category_name: string
    Service_name: string
  }

  type ServicedPetItemType = {
    pet_listID: number
    Pet: string
    Pet_type: string
  }

  type PreVetSchoolType = {
    pre_vet_school_listID: number
    School_name: string
  }

  type MajorType = {
    major_listID: number
    Major_name: string
  }

  type PreVetEducationTypeType = {
    pre_vet_education_typeID: number
    Education_type: string
  }

  type VetSchoolListType = {
    vet_school_listID: number
    School_name: string
  }

  type VetEducationTypeType = {
    vet_education_typeID: number
    Education_type: string
  }

  type InsuranceItemType = {
    insurance_listID: number
    Insurance_name: string
  }

  type SpecialtyItemType = {
    specialties_listID: number
    Organization_name: string
    Specialty_name: string
  }

  type LanguageItemType = {
    language_listID: number
    Language_name: string
  }
}

export {}
