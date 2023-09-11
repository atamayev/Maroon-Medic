import { useContext } from "react"
import { observer } from "mobx-react"
import SettingsLinks from "../../../components/settings-links"
import UnauthorizedUser from "../../../components/unauthorized-user/unauthorized-user"
import DoctorHeader from "../doctor-header"
import { AppContext } from "src/contexts/maroon-context"

function DoctorSettingsCards() {
	const { userType } = useContext(AppContext)

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

export default observer(DoctorSettingsCards)
