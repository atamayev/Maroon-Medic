import { useContext } from "react"
import _ from "lodash"
import WelcomeOrBack from "../welcome-or-back"
import { AppContext } from "src/contexts/maroon-context"

export default function PersonalInfo () {
	const { personalInfo } = useContext(AppContext)

	if (!personalInfo) return <>Loading...</>

	return (
		<p>
			Welcome <WelcomeOrBack />, Dr. {_.upperFirst(personalInfo.lastName || "")}
		</p>
	)
}
