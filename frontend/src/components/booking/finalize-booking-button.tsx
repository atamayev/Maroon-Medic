import { Button } from "react-bootstrap"
import useFinalizeBookingClick from "src/custom-hooks/public-doctor/use-finalize-booking-click"

interface FinalizeBookingProps {
  selectedService: ServiceItem | null
  selectedLocation: PublicAddressData | null
  selectedDay: string | null
  selectedTime: string | null
  serviceMinutes: number
  personalData: DoctorPersonalData
  selectedPet: SavedPetItem | null
}

const ConfirmOrRequestMessage = (selectedLocation: PublicAddressData) => {
  if (selectedLocation.instant_book) return <>Confirm</>
  return <>Request</>
}

export const FinalizeBookingButton = (props: FinalizeBookingProps) => {
  const { selectedService, selectedLocation, selectedDay, selectedTime, serviceMinutes, personalData, selectedPet } = props
  if (!(selectedService && selectedLocation && selectedDay && selectedTime)) return null

  return (
    <Button
      className="mt-3"
      onClick={() => useFinalizeBookingClick(
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
