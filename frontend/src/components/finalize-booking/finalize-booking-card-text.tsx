import moment from "moment"

interface Props {
  selectedService: ServiceItem,
  selectedLocation: PublicAddressData,
  selectedDay: string,
  selectedTime: string,
  serviceMinutes: number,
  selectedPet: SavedPetItem
}

const FinalizeBookingCardText = (props: Props) => {
	const { selectedService, selectedLocation, selectedDay, selectedTime, serviceMinutes, selectedPet } = props

	return (
		<div className="bg-yellow-100 p-4 rounded border border-brown-400">
			<div className="block text-brown-800 mb-1">
				<strong className="font-bold">Pet:</strong> {selectedPet.Name}
			</div>
			<div className="block text-brown-800 mb-1">
				<strong className="font-bold">Service:</strong> {selectedService.Service_name}
			</div>
			<div className="block text-brown-800 mb-1">
				<strong className="font-bold">
          Location:
				</strong>
				{selectedLocation.address_title}:  {selectedLocation.address_line_1} {selectedLocation.address_line_2}
			</div>
			<div className="block text-brown-800 mb-1">
				<strong className="font-bold">Day:</strong> {selectedDay}
			</div>
			<div className="block text-brown-800 mb-1">
				<strong className="font-bold">
          Time:
				</strong>
				{selectedTime} - {moment(selectedTime, "HH:mm").add(serviceMinutes, "minutes").format("h:mm A")}
			</div>
			<div className="block text-brown-800 mb-1">
				<strong className="font-bold">Price:</strong> ${selectedService.Service_price}
			</div>
		</div>
	)

}

export default FinalizeBookingCardText
