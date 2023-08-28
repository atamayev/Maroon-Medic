import _ from "lodash"

const DoctorPersonalInfo = ({ personalData } : { personalData: DoctorPersonalData | null }) => {
	if (!personalData) return null
	return (
		<>
      Dr. {""} {_.upperFirst(personalData.firstName || "")} {""} {_.upperFirst(personalData.lastName || "")}
		</>
	)
}

export default DoctorPersonalInfo
