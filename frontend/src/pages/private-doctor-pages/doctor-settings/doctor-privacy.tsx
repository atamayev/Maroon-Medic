import { useContext } from "react"
import { observer } from "mobx-react"
import { AppContext } from "src/contexts/maroon-context"
import DoctorHeader from "../doctor-header"
import UnauthorizedUser from "../../../components/unauthorized-user/unauthorized-user"

function DoctorPrivacy() {
	const appContext = useContext(AppContext)

	if (appContext.userType !== "Doctor") return <UnauthorizedUser vetOrpatient = {"vet"}/>

	return (
		<>
			<DoctorHeader/>
			DoctorPrivacy
		</>
	)
}

export default observer(DoctorPrivacy)
