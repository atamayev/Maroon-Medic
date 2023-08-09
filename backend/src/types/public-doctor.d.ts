declare global {
  type LanguagesData = {
    Language_name: string
  }

  type SpecialtiesData = {
    Organization_name: string
    Specialty_name: string
  }

  type ServicedPetData = {
    pet: string
    pet_type: string
  }

  type PublicAddressData = AddressData & {
    Phone: string
    times: AvailabilityDataType[]
  }

  interface PublicDoctorAccountDetails {
    doctorLanguages: LanguagesData[]
    doctorServices: ServiceItemType[]
    doctorSpecialties: SpecialtiesData[]
    doctorPreVetEducation: PreVetEducationItemType[]
    doctorVetEducation: VetEducationItemType[]
    doctorAddressData: PublicAddressData[]
    description: string
    servicedPets: ServicedPetData[]
    doctorPersonalInfo: DoctorPersonalInfo
  }
}

export {}
