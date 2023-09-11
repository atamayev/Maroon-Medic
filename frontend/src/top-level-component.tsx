import { useMemo } from "react"
import { AppContext, MaroonContext } from "./contexts/maroon-context"
import cookieCheck from "./utils/cookie-check"

export default function TopLevelComponent ({ children } : { children: React.ReactNode }) {
	const sharedState = useMemo(() => new MaroonContext(), [])
	const accessToken = cookieCheck.getCookie("AccessToken")
	const userType: DoctorOrPatientOrUndefined = "Doctor"
	// const userType = localStorage.getItem("UserType") as DoctorOrPatientOrNull

	sharedState.isAuthenticated = !!accessToken
	sharedState.userType = userType

	return (
		<AppContext.Provider value={sharedState}>
			{children}
		</AppContext.Provider>
	)
}
