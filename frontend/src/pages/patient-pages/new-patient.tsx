import { observer } from "mobx-react"
import { useState, useContext } from "react"
import NewAccountForm from "../../components/new-account-form"
import useNewUserSubmit from "../../custom-hooks/auth/auth-submits/use-new-user-submit"
import AppContext from "src/contexts/maroon-context"
import useRedirectNullUser from "src/custom-hooks/redirects/use-redirect-null-user"

function NewPatient () {
	const appContext = useContext(AppContext)
	const [newPatientInfo, setNewPatientInfo] = useState<BirthDateInfo>({
		firstName: "",
		lastName: "",
		dateOfBirth: "",
		gender: ""
	})
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)

	useRedirectNullUser("patient")

	const { newUserSubmit } = useNewUserSubmit(setError, setLoading, "Patient")

	if (appContext.auth.userType !== "Patient") return null

	return (
		<NewAccountForm
			handleSubmit = {(e) => newUserSubmit(e, newPatientInfo)}
			newInfo = {newPatientInfo}
			setNewInfo = {setNewPatientInfo}
			error = {error}
			loading = {loading}
		/>
	)
}

export default observer(NewPatient)
