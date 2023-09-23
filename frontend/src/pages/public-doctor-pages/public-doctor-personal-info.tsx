import _ from "lodash"
import { observer } from "mobx-react"
import useRetrieveDoctorIDFromParams from "src/custom-hooks/public-doctor/use-retrieve-doctor-id-from-params"
import useRetrieveSinglePublicDoctorData from "src/custom-hooks/public-doctor/use-retrieve-single-public-doctor-data"

function PersonalInfoSection() {
	const doctorID = useRetrieveDoctorIDFromParams()
	const doctorData = useRetrieveSinglePublicDoctorData(doctorID)

	if (_.isNull(doctorData)) return null

	return (
		<h3>
			Dr. {""} {_.upperFirst(doctorData.doctorPersonalInfo.firstName || "")}
			{""} {_.upperFirst(doctorData.doctorPersonalInfo.lastName || "")}
		</h3>
	)
}

export default observer(PersonalInfoSection)
