import { useState } from "react"
import Button from "../button"
import changePassword from "../../helper-functions/shared/change-password"
import CurrentPasswordInput from "./current-password-input"
import NewPasswordInput from "./new-password"
import SavedPasswordMessage from "./saved-password-message"
import ConfirmNewPasswordInput from "./confirm-new-password"

export default function ChangePassword( { type } : { type: DoctorOrPatient }) {
	const [credentials, setCredentials] = useState<ChangePasswordObject>({
		userType: type,
		currentPassword: "",
		newPassword: "",
		newConfirmPassword: "",
	})
	const [message, setMessage] = useState("")
	const [loading, setLoading] = useState(false)
	const [showPassword, setShowPassword] = useState(false)

	const HideOrShowPassword = () => {
		if (showPassword) return "Hide Password"
		return "Show Password"
	}

	const handleSubmit = async () => {
		await changePassword(credentials, setCredentials, setMessage, setLoading, type)
	}

	const isShowPassword = () => {
		if (showPassword) return "text"
		return "password"
	}

	return (
		<div className="bg-white shadow-md rounded p-6">
			<h2 className="text-center mb-4 text-xl font-bold">Change Password</h2>
			<form onSubmit={(e) => {
				e.preventDefault()
				handleSubmit()
			}}>
				<CurrentPasswordInput
					isShowPassword={isShowPassword()}
					credentials={credentials}
					setCredentials={setCredentials}
				/>

				<NewPasswordInput
					isShowPassword={isShowPassword()}
					credentials={credentials}
					setCredentials={setCredentials}
				/>

				<ConfirmNewPasswordInput
					isShowPassword={isShowPassword()}
					credentials={credentials}
					setCredentials={setCredentials}
				/>

				<Button
					className="mt-3"
					colorClass="bg-orange-600"
					hoverClass="hover:bg-orange-700"
					title={HideOrShowPassword()}
					onClick={() => (setShowPassword(!showPassword))}
				/>

				<SavedPasswordMessage message={message} />

				<Button
					className="mt-3 w-100"
					colorClass="bg-emerald-600"
					hoverClass="hover:bg-emerald-700"
					title="Change Password"
					disabled={loading}
				/>
			</form>
		</div>
	)
}
