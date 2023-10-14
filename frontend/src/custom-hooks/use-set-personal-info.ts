import _ from "lodash"
import { useState, useEffect, useContext } from "react"
import AppContext from "src/contexts/maroon-context"
import useFetchPersonalInfoData from "src/custom-hooks/use-fetch-personal-info-data"

export default function useSetPersonalInfo(
	userType: DoctorOrPatientOrNull,
	expectedUserType: DoctorOrPatient
): {personalInfo: BirthDateInfo, setPersonalInfo: React.Dispatch<React.SetStateAction<BirthDateInfo>>}
{
	const sharedData = useContext(AppContext).sharedData
	const [personalInfo, setPersonalInfo] = useState<BirthDateInfo>({} as BirthDateInfo)

	useEffect(() => {
		if (userType !== expectedUserType) return
		const fetchAndSetPersonalInfo: () => Promise<void> = async () => {
			try {
				if (!_.isNull(sharedData) && !_.isNull(sharedData.personalInfo)) {
					setPersonalInfo(sharedData.personalInfo)
				}
				else await useFetchPersonalInfoData(setPersonalInfo, userType)
			} catch (error) {
			}
		}

		fetchAndSetPersonalInfo()
	}, [userType])

	return { personalInfo, setPersonalInfo }
}
