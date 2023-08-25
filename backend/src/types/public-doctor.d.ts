declare global {
  type LanguageName = {
    Language_name: string
  }

  type OrganizationSpecialtyName = {
    Organization_name: string
    Specialty_name: string
  }

  type ServicedPetData = {
    pet: string
    pet_type: string
  }

  type PublicAddressData = AddressData & {
    phone: string
    times: DoctorAvailability[]
  }

  interface PublicDoctorAccountDetails {
    doctorLanguages: LanguageName[]
    doctorServices: DetailedServiceItem[]
    doctorSpecialties: OrganizationSpecialtyName[]
    doctorPreVetEducation: PreVetEducation[]
    doctorVetEducation: VetEducation[]
    doctorAddressData: PublicAddressData[]
    description: string
    servicedPets: ServicedPetData[]
    doctorPersonalInfo: DoctorPersonalInfo
  }
}

export {}
