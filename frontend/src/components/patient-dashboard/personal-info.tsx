import WelcomeOrBack from "../welcome-or-back"

function PersonalInfo ({ personalInfo } : {personalInfo : BirthDateInfo | null}) {
	if (!personalInfo) return <>Loading...</>
	return (
		<p>
			Welcome <WelcomeOrBack />, {personalInfo.firstName}
		</p>
	)
}

export default PersonalInfo
