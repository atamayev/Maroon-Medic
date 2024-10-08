import { observer } from "mobx-react"
import { useState, useContext } from "react"
import NewAccountForm from "../../components/new-account-form"
import useNewUserSubmit from "../../custom-hooks/auth/auth-submits/use-new-user-submit"
import AppContext from "src/contexts/maroon-context"
import useRedirectNullUser from "src/custom-hooks/redirects/use-redirect-null-user"

function NewDoctor () {
	const appContext = useContext(AppContext)
	const [newDoctorInfo, setNewDoctorInfo] = useState<BirthDateInfo>({
		firstName: "",
		lastName: "",
		dateOfBirth: "",
		gender: ""
	})
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)

	useRedirectNullUser("vet")

	const { newUserSubmit } = useNewUserSubmit(setError, setLoading, "Vet")

	if (appContext.auth.userType !== "Doctor") return null

	return (
		<NewAccountForm
			handleSubmit = {(e) => newUserSubmit(e, newDoctorInfo)}
			newInfo = {newDoctorInfo}
			setNewInfo = {setNewDoctorInfo}
			error = {error}
			loading = {loading}
		/>
	)
}

export default observer(NewDoctor)
