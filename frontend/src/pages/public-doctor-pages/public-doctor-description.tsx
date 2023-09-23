import _ from "lodash"
import { observer } from "mobx-react"
import PublicDoctorCard from "src/components/public-doctor-card"
import useRetrieveDoctorIDFromParams from "src/custom-hooks/public-doctor/use-retrieve-doctor-id-from-params"
import useRetrieveSinglePublicDoctorData from "src/custom-hooks/public-doctor/use-retrieve-single-public-doctor-data"

function DescriptionSection() {
	const doctorID = useRetrieveDoctorIDFromParams()
	const doctorData = useRetrieveSinglePublicDoctorData(doctorID)

	if (_.isNull(doctorData)) return null
	return (
		<PublicDoctorCard
			title = "Description"
			content = {<>{doctorData.description}</>}
		/>
	)
}

export default observer(DescriptionSection)
