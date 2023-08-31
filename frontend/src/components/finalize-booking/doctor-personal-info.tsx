import _ from "lodash"

export default function DoctorPersonalInfo ({ personalData } : { personalData: DoctorPersonalData | null }) {
	if (!personalData) return null
	return (
		<>
      Dr. {""} {_.upperFirst(personalData.firstName || "")} {""} {_.upperFirst(personalData.lastName || "")}
		</>
	)
}
