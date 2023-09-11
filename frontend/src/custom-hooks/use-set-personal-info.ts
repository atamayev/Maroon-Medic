import { useState, useEffect, useContext } from "react"
import { AppContext } from "src/contexts/maroon-context"
import useFetchPersonalInfoData from "src/custom-hooks/use-fetch-personal-info-data"

export default function useSetPersonalInfo(
	userType: DoctorOrPatientOrNull,
	expectedUserType: DoctorOrPatient
): {personalInfo: BirthDateInfo, setPersonalInfo: React.Dispatch<React.SetStateAction<BirthDateInfo>>}
{
	const appContext = useContext(AppContext)
	const [personalInfo, setPersonalInfo] = useState<BirthDateInfo>({
		firstName: "",
		lastName: "",
		birthMonth: "",
		birthDay: -1,
		birthYear: -1,
		gender: ""
	})

	useEffect(() => {
		if (userType !== expectedUserType) return
		const fetchAndSetPersonalInfo: () => Promise<void> = async () => {
			try {
				if (appContext.personalInfo) setPersonalInfo(appContext.personalInfo)
				else await useFetchPersonalInfoData(setPersonalInfo, userType)
			} catch (error) {
			}
		}

		fetchAndSetPersonalInfo()
	}, [userType])

	return {personalInfo, setPersonalInfo}
}
