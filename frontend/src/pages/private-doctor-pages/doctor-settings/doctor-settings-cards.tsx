import SettingsLinks from "../../../components/settings-links"
import UnauthorizedUser from "../../../components/unauthorized-user/unauthorized-user"
import useSimpleUserVerification from "../../../custom-hooks/use-simple-user-verification"
import Header from "../../../components/header/header"
import DoctorHeader from "../doctor-header"

export default function DoctorSettingsCards() {
	const { userType } = useSimpleUserVerification()

	if (userType !== "Doctor") return <UnauthorizedUser vetOrpatient = {"vet"}/>

	return (
		<>
			<Header dropdown = {true}/>
			<DoctorHeader/>
			<div className="flex flex-col items-center">
				<SettingsLinks SettingsLink = {"personal-information"} title = {"Personal Information"}/>
				<SettingsLinks SettingsLink = {"privacy"} title = {"Privacy"}/>
				<SettingsLinks SettingsLink = {"login-and-security"} title = {"Login & Security"}/>
			</div>
		</>
	)
}
