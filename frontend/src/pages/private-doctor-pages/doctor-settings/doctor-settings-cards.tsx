import SettingsLinks from "../../../components/settings-links"
import UnauthorizedUser from "../../../components/unauthorized-user/unauthorized-user"
import useSimpleUserVerification from "../../../custom-hooks/use-simple-user-verification"
import DoctorHeader from "../doctor-header"

export default function DoctorSettingsCards() {
	const { userType } = useSimpleUserVerification()

	if (userType !== "Doctor") return <UnauthorizedUser vetOrpatient = {"vet"}/>

	return (
		<>
			<DoctorHeader/>
			<div className="flex flex-row items-center justify-center">
				<SettingsLinks settingsLink = {"personal-information"} title = {"Personal Information"}/>
				<SettingsLinks settingsLink = {"privacy"} title = {"Privacy"}/>
				<SettingsLinks settingsLink = {"login-and-security"} title = {"Login & Security"}/>
			</div>
		</>
	)
}
