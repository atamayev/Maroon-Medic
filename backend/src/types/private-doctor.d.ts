declare global {
  interface DoctorDashboardData extends DashboardDataType {
    Patient_FirstName: string
    Patient_LastName: string
  }

  type DoctorPersonalInfoWithoutNVI = BasicPersonalInfo & {
    gender: string
  }

  type DoctorPersonalInfo = BasicPersonalInfo & {
    NVI: number
    gender: string
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
    schoolName: string
    educationType: string
    startDate: string
    endDate: string
  }

  type PreVetEducation = EducationItem & {
    preVetEducationMappingId: number
    majorName: string
  }

  type VetEducation = EducationItem & {
    vetEducationMappingId: number
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
    phone: string
    times: DoctorAvailability[]
    address_public_status: boolean
  }

  type PrivateDoctorAddressLessTimesAndPhone = AddressData & {
    address_public_status: boolean
  }
}

export {}
