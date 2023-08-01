declare global {
  type LanguageItemType = {
    language_listID: number
    Language_name: string
  }

  type ServiceItemType = {
    service_and_category_listID: number
    Category_name: string
    Service_name: string
    Service_time: string
    Service_price: number
  }

  type ServiceListItemType = {
    service_and_category_listID: number
    Category_name: string
    Service_name: string
  }

  type SpecialtyItemType = {
    specialties_listID: number
    Organization_name: string
    Specialty_name: string
  }

  type EducationItemType = {
    education_mappingID: number
    School_name: string
    Major_name?: string
    Education_type: string
    Start_Date: string
    End_Date: string
  }

  type DoctorAddressDataType = {
    address_priority: number
    addressesID: number
    address_title: string
    address_line_1: string
    address_line_2: string
    city: string
    state: string
    zip: string
    country: string
    instant_book: boolean
    address_public_status: boolean
    phones: PhoneDataType[]
    times: AvailabilityDataType[]
  }

  type PhoneDataType = {
    Phone: string
  }

  type AvailabilityDataType = {
    Day_of_week: string
    Start_time: string
    End_time: string
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

  type DoctorStatusType = {
    PubliclyAvailable: boolean
    Verified: boolean
  }

  type PicturesItemType = {
    picture_link: string
    picture_number: number
  }

  type PersonalData = {
    FirstName: string
    LastName: string
    Gender: string
  }
}

export {}
