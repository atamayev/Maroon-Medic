import _ from "lodash"
import { observer } from "mobx-react"
import useRetrieveDoctorIDFromParams from "src/custom-hooks/public-doctor/use-retrieve-doctor-id-from-params"
import useRetrieveSinglePublicDoctorData from "src/custom-hooks/public-doctor/use-retrieve-single-public-doctor-data"

interface NoAvailableTimesProps {
	noAvailableTimesMessage: boolean
}

function NoAvailableTimes (props: NoAvailableTimesProps) {
	const { noAvailableTimesMessage } = props
	const doctorID = useRetrieveDoctorIDFromParams()
	const doctorData = useRetrieveSinglePublicDoctorData(doctorID)

	if (_.isNil(doctorData)) return null

	if (!noAvailableTimesMessage) return null

	return (
		<>
			Dr. {_.upperFirst(doctorData.doctorPersonalInfo.lastName || "")}
			does not currently have any open appointments at this location
		</>
	)
}

export default observer(NoAvailableTimes)
