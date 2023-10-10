import moment from "moment"

interface Props {
	appointmentInformation: AppointmentInformation
	serviceMinutes: number
}

export default function FinalizeBookingCardText (props: Props) {
	const { appointmentInformation, serviceMinutes } = props

	return (
		<div className="bg-yellow-100 p-4 rounded border border-brown-400">
			<div className="block text-brown-800 mb-1">
				<strong className="font-bold">Pet:</strong> {appointmentInformation.selectedPet!.name}
			</div>
			<div className="block text-brown-800 mb-1">
				<strong className="font-bold">Service:</strong> {appointmentInformation.selectedService!.serviceName}
			</div>
			<div className="block text-brown-800 mb-1">
				<strong className="font-bold">
					Location:
				</strong>
				{" "} {appointmentInformation.selectedLocation!.addressTitle}: {" "}
				{appointmentInformation.selectedLocation!.addressLine1} {" "} {appointmentInformation.selectedLocation!.addressLine2}
			</div>
			<div className="block text-brown-800 mb-1">
				<strong className="font-bold">Day:</strong> {appointmentInformation.selectedDay}
			</div>
			<div className="block text-brown-800 mb-1">
				<strong className="font-bold">
					Time:
				</strong>
				{" "} {appointmentInformation.selectedTime} - {" "}
				{moment(appointmentInformation.selectedTime, "h:mm A").add(serviceMinutes, "minute").format("h:mm A")}
			</div>
			<div className="block text-brown-800 mb-1">
				<strong className="font-bold">Price:</strong> ${appointmentInformation.selectedService!.servicePrice}
			</div>
		</div>
	)
}
