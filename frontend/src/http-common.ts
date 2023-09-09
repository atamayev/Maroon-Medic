import axios from "axios"
import cookieCheck from "./utils/cookie-check"

const http = axios.create({
	baseURL: "http://localhost:8800/api",
	withCredentials: true,
	headers: {
		"Content-type": "application/json"
	}
})

http.interceptors.request.use((config) => {
	// Retrieve values from session storage/cookies
	const userType = sessionStorage.getItem("UserType")
	const accessToken = cookieCheck.getCookie("AccessToken")

	// Update headers
	if (userType) config.headers["user-type"] = userType
	if (accessToken) config.headers["authorization"] = `Bearer ${accessToken}`

	return config
})

export default http
