declare global {
	type EmptyResponse = {}
	type ErrorResponse = { error: string }
	type RedirectResponse = { shouldRedirect: boolean, redirectURL: string }
	type JWTResponse = { isValid: boolean, type: DoctorOrPatient }
	type LoginRegisterSuccess = { authenticated: boolean, userType: DoctorOrPatient, accessToken: string }
}

export {}
