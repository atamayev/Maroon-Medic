import _ from "lodash"
import { useContext } from "react"
import AppContext from "src/contexts/maroon-context"
import WelcomeOrBack from "../welcome-or-back"

function PersonalInfo () {
	const personalInfo = useContext(AppContext).sharedData?.personalInfo

	if (_.isNil(personalInfo)) return <>Loading...</>

	return (
		<p>
			Welcome <WelcomeOrBack />, {personalInfo.firstName}
		</p>
	)
}

export default PersonalInfo
