import _ from "lodash"
import { observer } from "mobx-react"
import PublicDoctorCard from "src/components/public-doctor-card"
import useRetrieveDoctorIDFromParams from "src/custom-hooks/public-doctor/use-retrieve-doctor-id-from-params"
import useRetrieveSinglePublicDoctorData from "src/custom-hooks/public-doctor/use-retrieve-single-public-doctor-data"

function EducationSection() {
	const doctorID = useRetrieveDoctorIDFromParams()
	const doctorData = useRetrieveSinglePublicDoctorData(doctorID)

	if (_.isNull(doctorData)) return null
	if (_.isEmpty(doctorData.doctorPreVetEducation) && _.isEmpty(doctorData.doctorVetEducation)) return null

	return (
		<PublicDoctorCard
			title = {`Where did Dr. ${_.upperFirst(doctorData.doctorPersonalInfo.lastName || "")} go to school?`}
			content = {
				<>
					<h3>Pre-Veterinary Education</h3>
					<Education educationList = {doctorData.doctorPreVetEducation} hasMajor = {true} />

					<h3>Veterinary Education</h3>
					<Education educationList = {doctorData.doctorVetEducation} hasMajor = {true} />
				</>
			}
		/>
	)
}

interface EducationProps {
	educationList: GeneralEducationItem[]
	hasMajor: boolean
}

function Education({ educationList, hasMajor } : EducationProps) {
	return (
		<>
			{educationList.map((edu, index) => (
				<p key = {index}>
					{edu.schoolName}, {edu.educationType}
					{hasMajor ? ` in ${edu.majorName}` : ""} {" "}
          ({edu.startDate} - {edu.endDate})
				</p>
			))}
		</>
	)
}

export default observer(EducationSection)
