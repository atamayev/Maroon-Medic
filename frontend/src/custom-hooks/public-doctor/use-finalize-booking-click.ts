import { useNavigate } from "react-router-dom"

export default function useFinalizeBookingClick(
  selectedService: ServiceItem,
  selectedLocation: PublicAddressData,
  selectedDay: string,
  selectedTime: string,
  serviceMinutes: number,
  personalData: DoctorPersonalData,
  selectedPet: SavedPetItem
): void {
  const navigate = useNavigate()
  const bookingDetails = {
    selectedService: selectedService,
    selectedLocation: selectedLocation,
    selectedDay,
    selectedTime,
    serviceMinutes,
    personalData,
    selectedPet
  }

  // Store the current state into sessionStorage
  sessionStorage.setItem("bookingDetails", JSON.stringify(bookingDetails))

  // Navigate to the finalize-booking page with the state
  navigate("/finalize-booking", { state: bookingDetails })
}

