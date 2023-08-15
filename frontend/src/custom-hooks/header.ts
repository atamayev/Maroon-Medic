import _ from "lodash"
import {useState, useEffect } from "react"
import PrivatePatientDataService from "src/services/private-patient-data-service"
import PrivateDoctorDataService from "src/services/private-doctor-data-service"
import { handle401AxiosError } from "src/utils/handle-errors"

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
        else await fetchPersonalInfo(userType, setHeaderData)
      } else {
        const storedInfo = sessionStorage.getItem("PatientPersonalInfo")
        if (storedInfo) setHeaderData(JSON.parse(storedInfo).FirstName)
        else await fetchPersonalInfo(userType, setHeaderData)
      }
    } catch (error) {
    }
  }

  useEffect(() => {
    getHeaderData()
  }, [userType])

  return {headerData, setHeaderData}
}

async function fetchPersonalInfo (
  type: DoctorOrPatient,
  setHeaderData: React.Dispatch<React.SetStateAction<string>>
): Promise<void> {
  let response
  if (type === "Doctor") {
    try {
      response = await PrivateDoctorDataService.fillPersonalData()
    } catch (error: unknown) {
      handle401AxiosError(error)
    }
  }
  else {
    try {
      response = await PrivatePatientDataService.fillPersonalData()
    } catch (error: unknown) {
      handle401AxiosError(error)
    }
  }

  if (response) {
    setHeaderData(response.data.FirstName)
    sessionStorage.setItem(`${type}PersonalInfo`, JSON.stringify(response.data))
  }
}
