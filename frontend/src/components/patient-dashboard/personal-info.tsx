import CheckCookie from "src/utils/cookie-check"

const WelcomeOrBack = () => {
	const newPatient = CheckCookie.forNewUser("PatientNewUser")

	if (newPatient) return <> to MaroonMedic</>
	return <> back</>
}

const PersonalInfo = ({ personalInfo } : {personalInfo : BirthDateInfo | null}) => {
	if (!personalInfo) return <>Loading...</>
	return (
		<p>
      Welcome <WelcomeOrBack />, {personalInfo.FirstName}
		</p>
	)
}

export default PersonalInfo
