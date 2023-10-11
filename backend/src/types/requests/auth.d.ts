declare global {
	interface ChangePasswordObject {
		userType: DoctorOrPatient
		currentPassword: string
		newPassword: string
		newConfirmPassword: string
	}

	interface LoginInformationObject {
		email: string
		password: string
		loginType: DoctorOrPatient
	}
}

export {}
