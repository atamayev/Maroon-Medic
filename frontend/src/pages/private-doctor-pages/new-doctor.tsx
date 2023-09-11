import { observer } from "mobx-react"
import { useState, useContext } from "react"
import NewAccountForm from "../../components/new-account-form"
import useNewUserSubmit from "../../custom-hooks/auth-submits/use-new-user-submit"
import { AppContext } from "src/contexts/maroon-context"

function NewDoctor () {
	const { userType } = useContext(AppContext)
	const [newDoctorInfo, setNewDoctorInfo] = useState<BirthDateInfo>({
		firstName: "",
		lastName: "",
		birthMonth: "",
		birthDay: -1,
		birthYear: -1,
		gender: ""
	})
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)

	const { newUserSubmit } = useNewUserSubmit(setError, setLoading, "Vet")

	if (userType !== "Doctor") return null

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
