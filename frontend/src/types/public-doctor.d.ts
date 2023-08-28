declare global {
  type LanguageName = {
    languageName: string
  }

  type OrganizationSpecialtyName = {
    organizationName: string
    specialtyName: string
  }

  type ServicedPetData = {
    petType: string
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
    instantBook: boolean
    phone: string
    times: DoctorAvailability[]
  }

  interface AppointmentInformation {
	selectedPet: SavedPetItem | null
	selectedService: ServiceItemNotNullablePrice | null
	selectedLocation: PublicAddressData | null
	selectedDay: string | null
	selectedTime: string | null
  }
}

export {}
