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
    addressesId: number
    addressPriority: number
    addressTitle: string
    addressLine1: string
    addressLine2: string
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
