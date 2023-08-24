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
	const { FirstName, LastName } = personalData
	return (
		<>
      Dr. {""} {_.upperFirst(FirstName || "")}
			{""} {_.upperFirst(LastName || "")}
		</>
	)
}
