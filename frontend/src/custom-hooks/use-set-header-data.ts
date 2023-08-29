import _ from "lodash"
import { useState, useEffect } from "react"
import fetchDoctorPersonalInfo from "src/helper-functions/private-doctor/fetch-doctor-personal-data"
import fetchPatientPersonalInfo from "src/helper-functions/patient/fetch-patient-personal-data"
import useSimpleUserVerification from "./use-simple-user-verification"

export function useSetHeaderData(): {
	headerData: string,
	setHeaderData: React.Dispatch<React.SetStateAction<string>>
	} {
	const { userType } = useSimpleUserVerification(false)
	const [headerData, setHeaderData] = useState("Profile")

	const getHeaderData: () => void = async () => {
		try {
			if (userType === "Doctor") {
				const storedInfo = sessionStorage.getItem("DoctorPersonalInfo")
				if (storedInfo) setHeaderData("Dr. " + _.upperFirst(JSON.parse(storedInfo).lastName))
				else await fetchDoctorPersonalInfo(setHeaderData)
			} else if (userType === "Patient") {
				const storedInfo = sessionStorage.getItem("PatientPersonalInfo")
				if (storedInfo) setHeaderData(JSON.parse(storedInfo).firstName)
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
