import { useContext } from "react"
import { observer } from "mobx-react"
import NullUser from "./unauthorized-user/null-user"
import AppContext from "src/contexts/maroon-context"

interface Props {
  doctorContent: JSX.Element
  patientContent: JSX.Element
}

function SharedPagesTemplate(props: Props) {
	const { doctorContent, patientContent } = props
	const appContext = useContext(AppContext)

	function Component () {
		if (appContext.auth.userType === "Doctor") return doctorContent
		else if (appContext.auth.userType === "Patient") return patientContent
		return <NullUser/>
	}

	return <Component />
}

export default observer(SharedPagesTemplate)
