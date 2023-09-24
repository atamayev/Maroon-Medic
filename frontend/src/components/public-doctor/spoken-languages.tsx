import _ from "lodash"
import { observer } from "mobx-react"
import useRetrieveDoctorIDFromParams from "src/custom-hooks/public-doctor/use-retrieve-doctor-id-from-params"
import useRetrieveSinglePublicDoctorData from "src/custom-hooks/public-doctor/use-retrieve-single-public-doctor-data"

function SpokenLanguages() {
	const doctorID = useRetrieveDoctorIDFromParams()
	const doctorData = useRetrieveSinglePublicDoctorData(doctorID)

	if (_.isNil(doctorData)) return null

	return (
		<>
			{doctorData.doctorLanguages.map((language, index) => (
				<p key = {index}>
					{language.languageName}
				</p>
			))}
		</>
	)
}

export default observer(SpokenLanguages)
