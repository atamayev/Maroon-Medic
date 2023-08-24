import DoctorHeader from "../doctor-header"
import UnauthorizedUser from "../../../components/unauthorized-user/unauthorized-user"
import useSimpleUserVerification from "../../../custom-hooks/use-simple-user-verification"

export default function DoctorPrivacy() {
	const { userType } = useSimpleUserVerification()

	if (userType !== "Doctor") return <UnauthorizedUser vetOrpatient = {"vet"}/>

	return (
		<>
			<DoctorHeader/>
			DoctorPrivacy
		</>
	)
}
