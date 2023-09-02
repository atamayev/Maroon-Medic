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
	// Retrieve values from session storage
	const userType = sessionStorage.getItem("UserType")
	const accessToken = cookieCheck.getCookie("AccessToken")
	const UUID = cookieCheck.getCookie("UUID")

	// Update headers
	if (userType) config.headers["user-type"] = userType
	if (accessToken) config.headers["authorization"] = `Bearer ${accessToken}`
	if (UUID) config.headers["uuid"] = UUID

	return config
})

export default http
