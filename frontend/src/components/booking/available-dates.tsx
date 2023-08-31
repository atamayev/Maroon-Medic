import _ from "lodash"

interface Props {
	appointmentInformation: AppointmentInformation
	personalData: DoctorPersonalData
	availableDates: string[]
}

export default function AvailableDates (props: Props) {
	const { appointmentInformation, personalData, availableDates } = props

	if (appointmentInformation.selectedDay ===
		`Dr. ${_.upperFirst(personalData.lastName || "")} does not currently have any open appointments at this location`
	) {
		return <option disabled>{appointmentInformation.selectedDay}</option>
	}

	return (
		<>
			{availableDates.map((date) => (
				<option key={date} value={date}>
					{date}
				</option>
			))}
		</>
	)
}
