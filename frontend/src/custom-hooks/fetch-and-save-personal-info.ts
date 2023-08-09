import {useState, useEffect } from "react"
import { AxiosResponse } from "axios"
import PrivateDoctorDataService from "../services/private-doctor-data-service"
import PrivatePatientDataService from "../services/private-patient-data-service"
import { handle401AxiosError } from "src/utils/handle-errors"

async function fetchPersonalInfoData(
  setPersonalInfo: React.Dispatch<React.SetStateAction<BirthDateInfo>>,
  userType: DoctorOrPatient
): Promise<void>
{
  try {
    let response: AxiosResponse

    if (userType === "Doctor") response = await PrivateDoctorDataService.fillPersonalData()
    else if (userType === "Patient") response = await PrivatePatientDataService.fillPersonalData()
    else throw new Error(`Invalid userType: ${userType}`)

    setPersonalInfo(response.data)
    sessionStorage.setItem(`${userType}PersonalInfo`, JSON.stringify(response.data))
  } catch (error: unknown) {
    handle401AxiosError(error)
  }
}

export const handleSavePersonalInfo = async (
  personalInfo: BirthDateInfo,
  setPersonalInfoConfirmation: (conf: ConfirmationMessage) => void,
  userType: DoctorOrPatient
): Promise<void> => {
  const storedPersonalInfoData = sessionStorage.getItem(`${userType}PersonalInfo`)
  const stringifiedPersonalInfoData = JSON.stringify(personalInfo)

  try {
    if (stringifiedPersonalInfoData !== storedPersonalInfoData) {
      let response: AxiosResponse
      if (userType === "Doctor") response = await PrivateDoctorDataService.savePersonalData(personalInfo)
      else if (userType === "Patient") response = await PrivatePatientDataService.savePersonalData(personalInfo)
      else throw new Error(`Invalid userType: ${userType}`)

      if (response.status === 200) {
        sessionStorage.setItem(`${userType}PersonalInfo`, JSON.stringify(personalInfo))
        setPersonalInfoConfirmation({messageType: "saved"})
      }
    } else {
      setPersonalInfoConfirmation({messageType: "same"})
    }
  } catch (error) {
    setPersonalInfoConfirmation({messageType: "problem"})
  }
}

export function usePersonalInfo(
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
