import _ from "lodash"
import WelcomeOrBack from "../welcome-or-back"

export default function PersonalInfo ({ personalInfo } : {personalInfo : BirthDateInfo | null}) {
	if (!personalInfo) return <>Loading...</>
	return (
		<p>
			Welcome <WelcomeOrBack />, Dr. {_.upperFirst(personalInfo.lastName || "")}
		</p>
	)
}
