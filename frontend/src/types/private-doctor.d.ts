declare global {
  interface DoctorDashboardData extends DashboardDataType {
    Patient_FirstName: string
    Patient_LastName: string
  }

  interface DoctorCalendarEvent {
    title: string
    start: Date
    end: Date
    doctorConfirmationStatus: boolean
  }

  type ServiceItem = {
    service_and_category_listID: number
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
    picture_link: string
    picture_number: number
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
