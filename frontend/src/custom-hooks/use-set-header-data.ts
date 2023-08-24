import _ from "lodash"
import { useState, useEffect } from "react"
import fetchDoctorPersonalInfo from "src/helper-functions/private-doctor/fetch-doctor-personal-data"
import fetchPatientPersonalInfo from "src/helper-functions/patient/fetch-patient-personal-data"

export function useSetHeaderData(
	userType: DoctorOrPatientOrNull
): {headerData: string, setHeaderData: React.Dispatch<React.SetStateAction<string>>} {
	const [headerData, setHeaderData] = useState("")

	const getHeaderData: () => void = async () => {
		try {
			if (!userType) return setHeaderData("Profile")
			if (userType === "Doctor") {
				const storedInfo = sessionStorage.getItem("DoctorPersonalInfo")
				if (storedInfo) setHeaderData("Dr. " + _.upperFirst(JSON.parse(storedInfo).LastName))
				else await fetchDoctorPersonalInfo(setHeaderData)
			} else {
				const storedInfo = sessionStorage.getItem("PatientPersonalInfo")
				if (storedInfo) setHeaderData(JSON.parse(storedInfo).FirstName)
				else await fetchPatientPersonalInfo(setHeaderData)
			}
		} catch (error) {
		}
	}

	useEffect(() => {
		getHeaderData()
	}, [userType])

	return {headerData, setHeaderData}
}
