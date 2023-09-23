import _ from "lodash"
import { observer } from "mobx-react"
import useRetrieveDoctorIDFromParams from "src/custom-hooks/public-doctor/use-retrieve-doctor-id-from-params"
import useRetrieveSinglePublicDoctorData from "src/custom-hooks/public-doctor/use-retrieve-single-public-doctor-data"

function DoctorDoesNotHaveLocations () {
	const doctorID = useRetrieveDoctorIDFromParams()
	const doctorData = useRetrieveSinglePublicDoctorData(doctorID)
	if (_.isNull(doctorData)) return null

	return (
		<div className="mb-4 border border-brown-400 bg-yellow-100 rounded">
			<div className="p-4 bg-amber-400 text-white">Ready to make a booking?</div>
			<div className="p-4">
				Dr. {_.upperFirst(doctorData.doctorPersonalInfo.lastName || "")} does not currently have any open locations.
			</div>
		</div>
	)
}

export default observer(DoctorDoesNotHaveLocations)
