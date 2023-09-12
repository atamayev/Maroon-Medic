import _ from "lodash"
import { useEffect, useContext } from "react"
import fetchDoctorPersonalInfo from "src/helper-functions/private-doctor/fetch-doctor-personal-data"
import fetchPatientPersonalInfo from "src/helper-functions/patient/fetch-patient-personal-data"
import { AppContext, MaroonContext } from "src/contexts/maroon-context"

export default function useSetHeaderData(): void {
	const appContext = useContext(AppContext)

	const getHeaderData: () => void = async () => {
		if (!_.isNull(appContext.personalInfo)) {
			if (appContext.userType === "Doctor") {
				appContext.headerData = `Dr. ${appContext.personalInfo.lastName}`
			} else if (appContext.userType === "Patient") {
				appContext.headerData = appContext.personalInfo.firstName
			}
			return
		}

		if (appContext.headerData === "Profile") {
			try {
				if (appContext.userType === "Doctor") await setDoctorHeaderData(appContext)
				else if (appContext.userType === "Patient") await setPatientHeaderData(appContext)
			} catch (error) {
			}
		}
	}

	useEffect(() => {
		if (appContext.headerData !== "Profile") return
		getHeaderData()
	}, [])
}

async function setDoctorHeaderData (appContext: MaroonContext): Promise<void> {
	const response = await fetchDoctorPersonalInfo()
	if (!response) return
	appContext.initializePersonalInfo(response.data)
	appContext.headerData = `Dr. ${response.data.lastName}`
}

async function setPatientHeaderData (appContext: MaroonContext): Promise<void> {
	const response = await fetchPatientPersonalInfo()
	if (!response) return
	appContext.initializePersonalInfo(response.data)
	appContext.headerData = response.data.firstName
}
