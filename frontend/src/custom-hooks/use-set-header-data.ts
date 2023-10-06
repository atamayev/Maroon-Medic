import _ from "lodash"
import { useEffect, useContext } from "react"
import fetchDoctorPersonalInfo from "src/helper-functions/private-doctor/fetch-doctor-personal-data"
import fetchPatientPersonalInfo from "src/helper-functions/patient/fetch-patient-personal-data"
import AppContext from "src/contexts/maroon-context"
import SharedDataClass from "src/classes/shared/shared-data-class"

export default function useSetHeaderData(): void {
	const appContext = useContext(AppContext)

	const getHeaderData: () => void = async () => {
		if (!_.isNull(appContext.sharedData) && !_.isNil(appContext.sharedData.personalInfo)) {
			if (appContext.auth.userType === "Doctor") {
				appContext.sharedData.headerData = `Dr. ${appContext.sharedData.personalInfo.lastName}`
			} else if (appContext.auth.userType === "Patient") {
				appContext.sharedData.headerData = appContext.sharedData.personalInfo.firstName
			}
			return
		}

		if (appContext.sharedData?.headerData === "Profile") {
			try {
				if (appContext.auth.userType === "Doctor") await setDoctorHeaderData(appContext.sharedData)
				else if (appContext.auth.userType === "Patient") await setPatientHeaderData(appContext.sharedData)
			} catch (error) {
			}
		}
	}

	useEffect(() => {
		if (!_.isNull(appContext.sharedData)) {
			if (
				appContext.auth.userType === "Doctor" &&
				appContext.sharedData.headerData === `Dr. ${appContext.sharedData.personalInfo?.lastName || ""}`
			) {
				return
			}
			else if (
				appContext.auth.userType === "Patient" &&
				appContext.sharedData.headerData === appContext.sharedData.personalInfo?.firstName
			) {
				return
			}
		}
		getHeaderData()
	}, [])
}

async function setDoctorHeaderData (sharedData: SharedDataClass): Promise<void> {
	const response = await fetchDoctorPersonalInfo()
	if (!response) return
	sharedData.initializePersonalInfo(response.data)
	sharedData.headerData = `Dr. ${response.data.lastName}`
}

async function setPatientHeaderData (sharedData: SharedDataClass): Promise<void> {
	const response = await fetchPatientPersonalInfo()
	if (!response) return
	sharedData.initializePersonalInfo(response.data)
	sharedData.headerData = response.data.firstName
}
