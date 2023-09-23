import _ from "lodash"


export default function PersonalInfoSection({ personalData } : { personalData: DoctorPersonalData }) {
	if (_.isEmpty(personalData)) return null

	return (
		<h3>
			<PersonalInfo personalData = {personalData} />
		</h3>
	)
}

function PersonalInfo({ personalData }: { personalData: DoctorPersonalData }) {
	const { firstName, lastName } = personalData
	return (
		<>
			Dr. {""} {_.upperFirst(firstName || "")}
			{""} {_.upperFirst(lastName || "")}
		</>
	)
}
