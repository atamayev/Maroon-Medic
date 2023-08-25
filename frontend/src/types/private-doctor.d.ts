declare global {
  interface DoctorDashboardData extends DashboardDataType {
    Patient_FirstName: string
    Patient_LastName: string
  }

  interface DoctorCalendarEvent {
    title: string
    start: Date
    end: Date
    Doctor_confirmation_status: boolean
  }

  type ServiceItem = {
    service_and_category_listID: number
    Service_time: string
    Category_name: string
    Service_name: string
  }

  interface ServiceItemNullablePrice extends ServiceItem {
    Service_price: number | null
  }

  interface ServiceItemNotNullablePrice extends ServiceItem{
    Service_price: number
  }

  interface EducationBase {
    School_name: string
    Education_type: string
    Start_Date: string
    End_Date: string
  }

  type GeneralEducationItem = EducationBase & {
    Major_name?: string
  }

  type PreVetEducationItem = EducationBase & {
    pre_vet_education_mappingID: number
    Major_name: string
  }

  type VetEducationItem = EducationBase & {
    vet_education_mappingID: number
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
