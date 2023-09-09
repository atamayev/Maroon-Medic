// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isLoginRegisterSuccess(data: any): data is LoginRegisterSuccess {
	return data && typeof data.authenticated === "boolean" && typeof data.userType === "string"
}
