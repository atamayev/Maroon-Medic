import _ from "lodash"
import { useState, useEffect, useContext } from "react"
import AppContext from "src/contexts/maroon-context"
import fetchLoginHistory from "src/helper-functions/shared/fetch-login-history"

export default function useSetLoginHistory(
	expectedUserType: DoctorOrPatient
): LoginHistoryItem[] {
	const appContext = useContext(AppContext)
	const [loginHistory, setLoginHistory] = useState<LoginHistoryItem[]>([])

	useEffect(() => {
		if (appContext.auth.userType !== expectedUserType) return
		const checkForLoginHistory: () => Promise<void> = async () => {
			try {
				if (!_.isNull(appContext.sharedData) && !_.isNull(appContext.sharedData.loginHistory)) {
					setLoginHistory(appContext.sharedData.loginHistory)
				}
				else await fetchLoginHistory(setLoginHistory, appContext.sharedData)
			} catch (error) {
			}
		}

		checkForLoginHistory()
	}, [appContext.auth.userType])

	return loginHistory
}
