import _ from "lodash"
import { useMemo } from "react"
import { AppContext, MaroonContext } from "./contexts/maroon-context"
import cookieCheck from "./utils/cookie-check"

export default function TopLevelComponent ({ children } : { children: React.ReactNode }) {
	const sharedState = useMemo(() => new MaroonContext(), [])
	const accessToken = cookieCheck.getCookie("AccessToken")
	const UUID = cookieCheck.getCookie("UUID")
	const userType = sessionStorage.getItem("UserType") as DoctorOrPatientOrNull

	if (!_.isNil(UUID)) sharedState.UUID = UUID
	if (!_.isNil(accessToken)) sharedState.accessToken = accessToken
	if (!_.isNil(userType)) sharedState.userType = userType

	return (
		<AppContext.Provider value={sharedState}>
			{children}
		</AppContext.Provider>
	)
}
