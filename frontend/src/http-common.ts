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
	const newUser = cookieCheck.getCookie("NewUser")

	// Update headers
	if (userType) config.headers["user-type"] = userType
	if (accessToken) config.headers["authorization"] = `Bearer ${accessToken}`
	if (UUID) config.headers["uuid"] = UUID
	if (newUser) config.headers["new-user"] = newUser

	return config
})

export default http
