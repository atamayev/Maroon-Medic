interface ResponseData {
	shouldRedirect: boolean
	redirectURL: string
}

const invalidUserAction = (responseData: ResponseData): void => {
	if (responseData.shouldRedirect) {
		sessionStorage.clear()
		localStorage.clear()
		window.location.href = responseData.redirectURL
	}
}

export default invalidUserAction
