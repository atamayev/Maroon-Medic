declare global {
  interface DoctorDashboardDataType extends DashboardDataType {
    Patient_FirstName: string
    Patient_LastName: string
  }

  type DoctorPersonalInfoLessNVI = BasicPersonalInfo & {
    Gender: string
  }

  type DoctorPersonalInfoLessGender = BasicPersonalInfo & {
    NVI: number
  }

  type DoctorPersonalInfo = BasicPersonalInfo & {
    NVI: number
    Gender: string
  }

  interface DoctorAccountDetails {
    languages: LanguageItemType[]
    services: ServiceItemType[]
    specialties: SpecialtyItemType[]
    preVetEducation: PreVetEducationItemType[]
    vetEducation: VetEducationItemType[]
    addressData: PrivateDoctorAddressData[]
    description: string
    servicedPets: ServicedPetItemType[]
    verified: boolean
    publiclyAvailable: boolean
  }

  interface EducationItemType {
    School_name: string
    Education_type: string
    Start_Date: string
    End_Date: string
  }

  type PreVetEducationItemType = EducationItemType & {
    pre_vet_education_mappingID: number
    Major_name: string
  }

  type VetEducationItemType = EducationItemType & {
    vet_education_mappingID: number
  }

  interface AddEducationItemType {
    School_ID: number
    Education_type_ID: number
    Start_date: string
    End_date: string
  }

  type AddPreVetEducationItemType = AddEducationItemType & {
    Major_ID: number
  }

  type DoctorStatusType = {
    PubliclyAvailable: boolean
    Verified: boolean
  }

  type PicturesItemType = {
    picture_link: string
    picture_number: number
  }

  type PrivateDoctorAddressData = AddressData & {
    Phone: string
    times: AvailabilityDataType[]
    address_public_status: boolean
  }

  type PrivateDoctorAddressLessTimesAndPhone = AddressData & {
    address_public_status: boolean
  }
}

export {}
