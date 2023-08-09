declare global {
  interface DoctorDashboardData extends DashboardDataType {
    Patient_FirstName: string
    Patient_LastName: string
  }

  type DoctorPersonalInfoWithoutNVI = BasicPersonalInfo & {
    Gender: string
  }

  type DoctorPersonalInfo = BasicPersonalInfo & {
    NVI: number
    Gender: string
  }

  interface DoctorAccountDetails {
    languages: LanguageItem[]
    services: DetailedServiceItem[]
    specialties: OrganizationSpecialty[]
    preVetEducation: PreVetEducation[]
    vetEducation: VetEducation[]
    addressData: PrivateDoctorAddressData[]
    description: string
    servicedPets: ServicedPetItem[]
    verified: boolean
    publiclyAvailable: boolean
  }

  interface EducationItem {
    School_name: string
    Education_type: string
    Start_Date: string
    End_Date: string
  }

  type PreVetEducation = EducationItem & {
    pre_vet_education_mappingID: number
    Major_name: string
  }

  type VetEducation = EducationItem & {
    vet_education_mappingID: number
  }

  interface AddEducationItem {
    School_ID: number
    Education_type_ID: number
    Start_date: string
    End_date: string
  }

  type AddPreVetEducationItem = AddEducationItem & {
    Major_ID: number
  }

  type DoctorStatus = {
    PubliclyAvailable: boolean
    Verified: boolean
  }

  type PicturesItem = {
    picture_link: string
    picture_number: number
  }

  type PrivateDoctorAddressData = AddressData & {
    Phone: string
    times: DoctorAvailability[]
    address_public_status: boolean
  }

  type PrivateDoctorAddressLessTimesAndPhone = AddressData & {
    address_public_status: boolean
  }
}

export {}