import _ from "lodash"
import { useState, useEffect, useContext } from "react"
import AppContext from "src/contexts/maroon-context"
import fetchLoginHistory from "src/helper-functions/shared/fetch-login-history"

export default function useSetLoginHistory(
	userType: DoctorOrPatientOrNull,
	expectedUserType: DoctorOrPatient
): LoginHistoryItem[] {
	const sharedData = useContext(AppContext).sharedData
	const [loginHistory, setLoginHistory] = useState<LoginHistoryItem[]>([])

	useEffect(() => {
		if (userType !== expectedUserType) return
		const checkForLoginHistory: () => Promise<void> = async () => {
			try {
				if (!_.isNull(sharedData) && !_.isNull(sharedData.loginHistory)) {
					setLoginHistory(sharedData.loginHistory)
				}
				else await fetchLoginHistory(setLoginHistory, sharedData)
			} catch (error) {
			}
		}

		checkForLoginHistory()
	}, [userType])

	return loginHistory
}
