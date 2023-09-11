import _ from "lodash"
import { useState, useEffect, useContext } from "react"
import fetchDoctorPersonalInfo from "src/helper-functions/private-doctor/fetch-doctor-personal-data"
import fetchPatientPersonalInfo from "src/helper-functions/patient/fetch-patient-personal-data"
import { AppContext } from "src/contexts/maroon-context"

export default function useSetHeaderData(userType: DoctorOrPatientOrNull): {
	headerData: string,
	setHeaderData: React.Dispatch<React.SetStateAction<string>>
	} {
	const [headerData, setHeaderData] = useState("Profile")

	const getHeaderData: () => void = async () => {
		try {
			if (userType === "Doctor") await setDoctorHeaderData(setHeaderData)
			else if (userType === "Patient") await setPatientHeaderData(setHeaderData)
		} catch (error) {
		}
	}

	useEffect(() => {
		getHeaderData()
	// Uncomment this:
	// }, [userType])
	}, [])

	return { headerData, setHeaderData }
}

async function setDoctorHeaderData (setHeaderData: React.Dispatch<React.SetStateAction<string>>): Promise<void> {
	const appContext = useContext(AppContext)

	if (appContext.personalInfo) setHeaderData("Dr. " + _.upperFirst(appContext.personalInfo.lastName))

	else {
		const response = await fetchDoctorPersonalInfo()
		if (!response) return
		setHeaderData("Dr. " + _.upperFirst(response.data.lastName))
		appContext.initializePersonalInfo(response.data)
	}
}

async function setPatientHeaderData (setHeaderData: React.Dispatch<React.SetStateAction<string>>): Promise<void> {
	const appContext = useContext(AppContext)

	if (appContext.personalInfo) setHeaderData(appContext.personalInfo.firstName)

	else {
		const response = await fetchPatientPersonalInfo()
		if (!response) return
		setHeaderData(response.data.firstName)
		appContext.initializePersonalInfo(response.data)
	}
}
