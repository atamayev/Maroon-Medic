import CheckCookie from "src/utils/cookie-check"

function WelcomeOrBack () {
	const newPatient = CheckCookie.forNewUser("PatientNewUser")

	if (newPatient) return <> to MaroonMedic</>
	return <> back</>
}

function PersonalInfo ({ personalInfo } : {personalInfo : BirthDateInfo | null}) {
	if (!personalInfo) return <>Loading...</>
	return (
		<p>
			Welcome <WelcomeOrBack />, {personalInfo.firstName}
		</p>
	)
}

export default PersonalInfo
