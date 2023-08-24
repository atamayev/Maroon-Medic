import SettingsLinks from "../../../components/settings-links"
import UnauthorizedUser from "../../../components/unauthorized-user/unauthorized-user"
import useSimpleUserVerification from "../../../custom-hooks/use-simple-user-verification"
import PatientHeader from "../patient-header"

export default function PatientSettingsCards() {
	const { userType } = useSimpleUserVerification()

	if (userType !== "Patient") return <UnauthorizedUser vetOrpatient = {"patient"}/>

	return (
		<>
			<PatientHeader/>
			<div className="flex flex-col items-center">
				<SettingsLinks SettingsLink = {"personal-information"} title = {"Personal Information"}/>
				<SettingsLinks SettingsLink = {"privacy"} title = {"Privacy"}/>
				<SettingsLinks SettingsLink = {"login-and-security"} title = {"Login & Security"}/>
			</div>
		</>
	)
}
