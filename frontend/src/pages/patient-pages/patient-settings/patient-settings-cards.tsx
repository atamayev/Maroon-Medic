import { useContext } from "react"
import { observer } from "mobx-react"
import SettingsLinks from "../../../components/settings-links"
import UnauthorizedUser from "../../../components/unauthorized-user/unauthorized-user"
import PatientHeader from "../patient-header"
import AppContext from "src/contexts/maroon-context"

function PatientSettingsCards() {
	const appContext = useContext(AppContext)

	if (appContext.auth.userType !== "Patient") return <UnauthorizedUser vetOrpatient = {"patient"}/>

	return (
		<>
			<PatientHeader/>
			<div className="flex flex-row items-center justify-center">
				<SettingsLinks settingsLink = {"personal-information"} title = {"Personal Information"}/>
				<SettingsLinks settingsLink = {"privacy"} title = {"Privacy"}/>
				<SettingsLinks settingsLink = {"login-and-security"} title = {"Login & Security"}/>
			</div>
		</>
	)
}

export default observer(PatientSettingsCards)
