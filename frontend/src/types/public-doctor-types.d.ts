declare global {
  type SpecialtyType = {
    Organization_name: string
    Specialty_name: string
  }

  type ServicedPetsType = {
    pet_type: string
    pet: string
  }

  type spokenLanguagesType = {
    Language_name: string
  }

  type PublicAddressType = {
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
    phone: string
    times: AvailabilityData[]
  }
}

export {}
