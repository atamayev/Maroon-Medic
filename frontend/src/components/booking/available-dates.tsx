import _ from "lodash"
import { observer } from "mobx-react"
import useRetrieveDoctorIDFromParams from "src/custom-hooks/public-doctor/use-retrieve-doctor-id-from-params"
import useRetrieveSinglePublicDoctorData from "src/custom-hooks/public-doctor/use-retrieve-single-public-doctor-data"

interface Props {
	appointmentInformation: AppointmentInformation
	availableDates: string[]
}

function AvailableDates (props: Props) {
	const { appointmentInformation, availableDates } = props
	const doctorID = useRetrieveDoctorIDFromParams()
	const doctorData = useRetrieveSinglePublicDoctorData(doctorID)

	if (_.isNil(doctorData)) return null

	if (appointmentInformation.selectedDay ===
		`Dr. ${_.upperFirst(doctorData.doctorPersonalInfo.lastName || "")} does not currently have any open appointments at this location`
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

export default observer(AvailableDates)
