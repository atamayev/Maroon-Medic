import useSimpleUserVerification from "src/custom-hooks/use-simple-user-verification"
import NullUser from "./unauthorized-user/null-user"

interface Props {
  doctorContent: JSX.Element
  patientContent: JSX.Element
}

export default function SharedPagesTemplate(props: Props) {
	const { doctorContent, patientContent } = props
	const { userType } = useSimpleUserVerification()

	function Component () {
		if (userType === "Doctor") return doctorContent
		else if (userType === "Patient") return patientContent
		return <NullUser/>
	}

	return <Component />
}
