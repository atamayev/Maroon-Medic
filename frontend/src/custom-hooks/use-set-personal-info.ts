import _ from "lodash"
import { useState, useEffect, useContext } from "react"
import AppContext from "src/contexts/maroon-context"
import useFetchPersonalInfoData from "src/custom-hooks/use-fetch-personal-info-data"

export default function useSetPersonalInfo(
	expectedUserType: DoctorOrPatient
): {
	personalInfo: BirthDateInfo, setPersonalInfo: React.Dispatch<React.SetStateAction<BirthDateInfo>>
} {
	const appContext = useContext(AppContext)
	const [personalInfo, setPersonalInfo] = useState<BirthDateInfo>({} as BirthDateInfo)

	useEffect(() => {
		if (appContext.auth.userType !== expectedUserType) return
		const fetchAndSetPersonalInfo: () => Promise<void> = async () => {
			try {
				if (!_.isNull(appContext.sharedData) && !_.isNull(appContext.sharedData.personalInfo)) {
					setPersonalInfo(appContext.sharedData.personalInfo)
				}
				else await useFetchPersonalInfoData(setPersonalInfo)
			} catch (error) {
			}
		}

		fetchAndSetPersonalInfo()
	}, [appContext.auth.userType])

	return { personalInfo, setPersonalInfo }
}
