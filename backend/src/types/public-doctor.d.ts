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

  type AddressData = {
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
    times: AvailabilityDataType[]
  }
}

export {}
