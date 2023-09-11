declare global {
  interface DoctorDashboardData extends DashboardDataType {
    patientFirstName: string
    patientLastName: string
  }

  interface DoctorCalendarEvent {
    title: string
    start: Date
    end: Date
    doctorConfirmationStatus: boolean
  }

  type ServiceItem = {
    serviceAndCategoryListId: number
    serviceTime: string
    categoryName: string
    serviceName: string
  }

  interface ServiceItemNullablePrice extends ServiceItem {
    servicePrice: number | null
  }

  interface ServiceItemNotNullablePrice extends ServiceItem{
    servicePrice: number
  }

  interface VetEducationData {
	schoolId: number
	educationTypeId: number
	startDate: string
	endDate: string
  }

  interface PreVetEducationData extends VetEducationData {
	majorId: number
  }

  interface EducationBase {
    schoolName: string
    educationType: string
    startDate: string
    endDate: string
  }

  type GeneralEducationItem = EducationBase & {
    majorName?: string
  }

  type PreVetEducationItem = EducationBase & {
    preVetEducationMappingId: number
    majorName: string
  }

  type VetEducationItem = EducationBase & {
    vetEducationMappingId: number
  }

  type PicturesItem = {
    pictureLink: string
    pictureNumber: number
  }

  interface DoctorAccountDetails {
    languages: LanguageItem[]
    services: ServiceItemNotNullablePrice[]
    specialties: SpecialtyItem[]
    preVetEducation: PreVetEducationItem[]
    vetEducation: VetEducationItem[]
    addressData: DoctorAddressData[]
    description: string
    servicedPets: ServicedPetItem[]
    verified: boolean
    publiclyAvailable: boolean
  }

  type DoctorAccountDispatchers = {
    setSpokenLanguages: React.Dispatch<React.SetStateAction<LanguageItem[]>>,
    setProvidedServices: React.Dispatch<React.SetStateAction<ServiceItemNotNullablePrice[]>>,
    setExpandedCategories: React.Dispatch<React.SetStateAction<string[]>>,
    setDoctorSpecialties: React.Dispatch<React.SetStateAction<SpecialtyItem[]>>,
    setPreVetEducation: React.Dispatch<React.SetStateAction<PreVetEducationItem[]>>,
    setVetEducation: React.Dispatch<React.SetStateAction<VetEducationItem[]>>,
    setAddresses: React.Dispatch<React.SetStateAction<DoctorAddressData[]>>,
    setDescription: React.Dispatch<React.SetStateAction<string>>,
    setServicedPets: React.Dispatch<React.SetStateAction<ServicedPetItem[]>>,
    setExpandedPetTypes: React.Dispatch<React.SetStateAction<string[]>>,
    setPubliclyAvailable: React.Dispatch<React.SetStateAction<boolean>>
  }
}

export {}
