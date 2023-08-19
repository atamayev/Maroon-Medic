import { NavigateFunction } from "react-router-dom"
import { Button } from "react-bootstrap"
import {
  finalizeBookingClick
} from "src/custom-hooks/public-doctor-hooks/booking-page-hooks"

interface FinalizeBookingProps {
  selectedService: ServiceItem | null
  selectedLocation: PublicAddressData | null
  selectedDay: string | null
  selectedTime: string | null
  serviceMinutes: number
  personalData: DoctorPersonalData
  selectedPet: SavedPetItem | null
  navigate: NavigateFunction
}

const ConfirmOrRequestMessage = (selectedLocation: PublicAddressData) => {
  if (selectedLocation.instant_book) return <>Confirm</>
  return <>Request</>
}

export const FinalizeBookingButton = (props: FinalizeBookingProps) => {
  const { selectedService, selectedLocation, selectedDay, selectedTime, serviceMinutes, personalData, selectedPet, navigate } = props
  if (!(selectedService && selectedLocation && selectedDay && selectedTime)) return null

  return (
    <Button
      className="mt-3"
      onClick={() => finalizeBookingClick(
        navigate,
        selectedService,
        selectedLocation,
        selectedDay,
        selectedTime,
        serviceMinutes,
        personalData,
        selectedPet!
      )}
      variant="primary"
    >
      Click to {ConfirmOrRequestMessage(selectedLocation)} an appointment
    </Button>
  )
}

export default FinalizeBookingButton
