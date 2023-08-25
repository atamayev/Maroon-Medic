import Button from "../button"
import useFinalizeBookingClick from "src/custom-hooks/public-doctor/use-finalize-booking-click"

interface FinalizeBookingProps {
  selectedService: ServiceItemNotNullablePrice | null
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
			title = {`Click to ${ConfirmOrRequestMessage(selectedLocation)} an appointment`}
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
			colorClass = "bg-green-600"
			hoverClass = "hover:bg-green-700"
		/>
	)
}

export default FinalizeBookingButton
