import { useState, useEffect } from "react"
import fetchPersonalInfoData from "src/helper-functions/shared/fetch-personal-info-data"

export default function useSetPersonalInfo(
	userType: DoctorOrPatientOrNull,
	expectedUserType: DoctorOrPatient
): {personalInfo: BirthDateInfo, setPersonalInfo: React.Dispatch<React.SetStateAction<BirthDateInfo>>}
{
	const [personalInfo, setPersonalInfo] = useState<BirthDateInfo>({
		FirstName: "",
		LastName: "",
		DOB_month: "",
		DOB_day: -1,
		DOB_year: -1,
		Gender: ""
	})

	useEffect(() => {
		if (userType !== expectedUserType) return
		const fetchAndSetPersonalInfo: () => Promise<void> = async () => {
			try {
				const storedPersonalInfoData = sessionStorage.getItem(`${userType}PersonalInfo`)
				if (storedPersonalInfoData) setPersonalInfo(JSON.parse(storedPersonalInfoData))
				else await fetchPersonalInfoData(setPersonalInfo, userType)
			} catch (error) {
			}
		}

		fetchAndSetPersonalInfo()
	}, [userType])

	return {personalInfo, setPersonalInfo}
}
