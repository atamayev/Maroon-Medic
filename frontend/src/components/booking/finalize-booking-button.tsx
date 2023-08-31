import _ from "lodash"
import Button from "../button"
import { useNavigate } from "react-router-dom"

interface FinalizeBookingProps {
	appointmentInformation: AppointmentInformation
	serviceMinutes: number
	personalData: DoctorPersonalData
}

function ConfirmOrRequestMessage (selectedLocation: PublicAddressData) {
	if (selectedLocation.instantBook) return "Confirm"
	return "Request"
}

export default function FinalizeBookingButton (props: FinalizeBookingProps) {
	const { appointmentInformation, serviceMinutes, personalData } = props
	const navigate = useNavigate()
	if (_.some(appointmentInformation, value => value === null)) return null

	const finalizeBookingClick = () => {
		const bookingDetails = {
			appointmentInformation,
			serviceMinutes,
			personalData,
		}

		sessionStorage.setItem("bookingDetails", JSON.stringify(bookingDetails))
		navigate("/finalize-booking", { state: bookingDetails })
	}

	return (
		<Button
			title = {`Click to ${ConfirmOrRequestMessage(appointmentInformation.selectedLocation!)} your appointment`}
			className="mt-3 font-semibold"
			onClick={() => finalizeBookingClick()}
			colorClass = "bg-green-600"
			hoverClass = "hover:bg-green-700"
			textColor = "text-white"
		/>
	)
}
