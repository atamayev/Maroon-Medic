import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { VerifyContext } from "../../contexts/verify-context"
import AuthDataService from "../../services/auth-data-service"
import NewAccountForm from "../../components/new-account-form"
import useNewUserSubmit from "../../custom-hooks/auth-submits/use-new-user-submit"

export default function NewDoctor () {
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
	const { userVerification } = useContext(VerifyContext)
	const navigate = useNavigate()

	const { newUserSubmit } = useNewUserSubmit(setError, setLoading, "Vet")

	const verifyNewDoctor = async () => {
		try {
			const result = await userVerification(false)
			if (result.verified === true && result.userType === "Doctor") {
				const doctorResult = await AuthDataService.newDoctorConfirmation()
				if (doctorResult.data === false) navigate("/vet-register")
			}
			else if (result.verified === true && result.userType === "Patient") navigate("/dashboard")
			else navigate("/vet-register")
		} catch (err) {
			console.log(err)
			navigate("/")
		}
	}

	useEffect(() => {
		verifyNewDoctor()
	}, [])

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
