import _ from "lodash"
import { observer } from "mobx-react"
import { useNavigate } from "react-router-dom"
import Button from "../button"
import useRetrieveSinglePublicDoctorData from "src/custom-hooks/public-doctor/use-retrieve-single-public-doctor-data"
import useRetrieveDoctorIDFromParams from "src/custom-hooks/public-doctor/use-retrieve-doctor-id-from-params"
import ConfirmOrRequestBook from "./confirm-or-request-book"

interface FinalizeBookingProps {
	appointmentInformation: AppointmentInformation
	serviceMinutes: number
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

		const stringifiedBookingDetails = JSON.stringify(bookingDetails)

		sessionStorage.setItem("bookingDetails", stringifiedBookingDetails)
		navigate("/finalize-booking", { state: stringifiedBookingDetails })
	}

	return (
		<Button
			title = {`Click to ${ConfirmOrRequestBook(appointmentInformation)} your appointment`}
			className="mt-3 font-semibold"
			onClick={finalizeBookingClick}
			colorClass = "bg-green-600"
			hoverClass = "hover:bg-green-700"
			textColor = "text-white"
		/>
	)
}

export default observer(FinalizeBookingButton)
