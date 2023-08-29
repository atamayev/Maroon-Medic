declare global {
  interface DoctorDashboardData extends DashboardDataType {
    patientFirstName: string
    patientLastName: string
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
    schoolId: number
    educationTypeId: number
    startDate: string
    endDate: string
  }

  type AddPreVetEducationItem = AddEducationItem & {
    majorId: number
  }

  type DoctorStatus = {
    publiclyAvailable: boolean
    verified: boolean
  }

  type PicturesItem = {
    pictureLink: string
    pictureNumber: number
  }

  type PrivateDoctorAddressData = AddressData & {
    phone: string
    times: DoctorAvailability[]
    addressPublicStatus: boolean
  }

  type PrivateDoctorAddressLessTimesAndPhone = AddressData & {
    addressPublicStatus: boolean
  }
}

export {}
