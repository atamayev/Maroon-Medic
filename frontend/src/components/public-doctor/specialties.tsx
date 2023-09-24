import _ from "lodash"
import { observer } from "mobx-react"
import useRetrieveDoctorIDFromParams from "src/custom-hooks/public-doctor/use-retrieve-doctor-id-from-params"
import useRetrieveSinglePublicDoctorData from "src/custom-hooks/public-doctor/use-retrieve-single-public-doctor-data"

interface OrganizationsType {
	[key: string]: OrganizationSpecialtyName[]
}

function Specialties() {
	const doctorID = useRetrieveDoctorIDFromParams()
	const doctorData = useRetrieveSinglePublicDoctorData(doctorID)

	if (_.isNil(doctorData)) return null

	const organizations: OrganizationsType = _.groupBy(doctorData.doctorSpecialties, "organizationName")

	return (
		<>
			{Object.entries(organizations).map(([organization, specialties], outerIndex) => (
				<div key = {outerIndex} style = {{ marginBottom: "10px" }}>
					<h3>{organization}</h3>
					{specialties.map((specialty, innerIndex) => (
						<p key = {innerIndex}>
							{specialty.specialtyName}
						</p>
					))}
				</div>
			))}
		</>
	)
}

export default observer(Specialties)
