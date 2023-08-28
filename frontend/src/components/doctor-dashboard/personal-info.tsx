import _ from "lodash"
import CheckCookie from "src/utils/cookie-check"

const WelcomeOrBack = () => {
	const newDoctor = CheckCookie.forNewUser("DoctorNewUser")

	if (newDoctor) return <> to MaroonMedic</>
	return <> back</>
}

const PersonalInfo = ({ personalInfo } : {personalInfo : BirthDateInfo | null}) => {
	if (!personalInfo) return <>Loading...</>
	return (
		<p>
      Welcome <WelcomeOrBack />, Dr. {_.upperFirst(personalInfo.lastName || "")}
		</p>
	)
}

export default PersonalInfo
