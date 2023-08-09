declare global {
  type LanguageName = {
    Language_name: string
  }

  type OrganizationSpecialtyName = {
    Organization_name: string
    Specialty_name: string
  }

  type ServicedPetData = {
    pet_type: string
    pet: string
  }

  type PublicAddressData = {
    addressesID: number
    address_priority: number
    address_title: string
    address_line_1: string
    address_line_2: string
    city: string
    state: string
    zip: string
    country: string
    instant_book: boolean
    Phone: string
    times: DoctorAvailability[]
  }
}

export {}
