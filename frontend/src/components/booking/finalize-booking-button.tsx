import _ from "lodash"
import Button from "../button"
import { useNavigate } from "react-router-dom"
import useRetrieveSinglePublicDoctorData from "src/custom-hooks/public-doctor/use-retrieve-single-public-doctor-data"
import useRetrieveDoctorIDFromParams from "src/custom-hooks/public-doctor/use-retrieve-doctor-id-from-params"
import { observer } from "mobx-react"

interface FinalizeBookingProps {
	appointmentInformation: AppointmentInformation
	serviceMinutes: number
}

function ConfirmOrRequestMessage (selectedLocation: PublicAddressData) {
	if (selectedLocation.instantBook) return "Confirm"
	return "Request"
}

function FinalizeBookingButton (props: FinalizeBookingProps) {
	const { appointmentInformation, serviceMinutes } = props
	const doctorID = useRetrieveDoctorIDFromParams()
	const doctorData = useRetrieveSinglePublicDoctorData(doctorID)

	const navigate = useNavigate()
	if (_.isNil(doctorData)) return null
	if (_.some(appointmentInformation, value => value === null)) return null

	const finalizeBookingClick = () => {
		const bookingDetails = {
			appointmentInformation,
			serviceMinutes,
			personalData: doctorData.doctorPersonalInfo,
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

export default observer(FinalizeBookingButton)
