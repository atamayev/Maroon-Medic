import _ from "lodash"
import { useContext } from "react"
import WelcomeOrBack from "../welcome-or-back"
import AppContext from "src/contexts/maroon-context"

export default function PersonalInfo () {
	const personalInfo = useContext(AppContext).sharedData?.personalInfo

	if (_.isNil(personalInfo)) return <>Loading...</>

	return (
		<p>
			Welcome <WelcomeOrBack />, Dr. {_.upperFirst(personalInfo.lastName || "")}
		</p>
	)
}
