import { useState, useContext } from "react"
import NewAccountForm from "../../components/new-account-form"
import useNewUserSubmit from "../../custom-hooks/auth-submits/use-new-user-submit"
import { AppContext } from "src/contexts/maroon-context"
import { observer } from "mobx-react"

function NewPatient () {
	const appContext = useContext(AppContext)
	const [newPatientInfo, setNewPatientInfo] = useState<BirthDateInfo>({
		firstName: "",
		lastName: "",
		birthMonth: "",
		birthDay: -1,
		birthYear: -1,
		gender: ""
	})
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)

	const { newUserSubmit } = useNewUserSubmit(setError, setLoading, "Patient")

	if (appContext.userType !== "Patient") return null

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
