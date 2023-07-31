import {useState, useEffect } from "react"
import { AxiosResponse, AxiosError } from "axios"
import PrivateDoctorDataService from "../services/private-doctor-data-service"
import PrivatePatientDataService from "../services/private-patient-data-service"
import { invalidUserAction } from "./user-verification-snippets"
import { PersonalInfoType } from "../components/personal-info-inputs"
import { handle401AxiosError } from "src/utils/handle-errors"

type UserType = DoctorOrPatient

async function fetchPersonalInfoData(
  setPersonalInfo: React.Dispatch<React.SetStateAction<PersonalInfoType>>,
  userType: UserType
): Promise<void>
{
  try {
    let response: AxiosResponse

    if (userType === "Doctor") response = await PrivateDoctorDataService.fillPersonalData()
    else if (userType === "Patient") response = await PrivatePatientDataService.fillPersonalData()
    else throw new Error(`Invalid userType: ${userType}`)

    if (response) {
      setPersonalInfo(response.data)
      sessionStorage.setItem(`${userType}PersonalInfo`, JSON.stringify(response.data))
    }
  } catch (error: unknown) {
    handle401AxiosError(error)
  }
}

export const handleSavePersonalInfo = async (
  personalInfo: PersonalInfoType,
  setPersonalInfoConfirmation: React.Dispatch<React.SetStateAction<{
                                  messageType: "saved" | "same" | "problem" | "none" | null;
                                  timeoutId?: number | null;
                               }>>,
  userType: UserType
) => {
  const storedPersonalInfoData = sessionStorage.getItem(`${userType}PersonalInfo`)
  const stringifiedPersonalInfoData = JSON.stringify(personalInfo)

  try {
    if (stringifiedPersonalInfoData !== storedPersonalInfoData) {// if there is a change, and handlesave is used:
      try {
        let response: AxiosResponse
        if (userType === "Doctor") response = await PrivateDoctorDataService.savePersonalData(personalInfo)
        else if (userType === "Patient") response = await PrivatePatientDataService.savePersonalData(personalInfo)
        else throw new Error(`Invalid userType: ${userType}`)

        if (response.status === 200) {
          sessionStorage.setItem(`${userType}PersonalInfo`, JSON.stringify(personalInfo))
          setPersonalInfoConfirmation({messageType: "saved"})
        }
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          if (error.response?.status === 401) {
            invalidUserAction(error.response.data)
          }
        }
        else setPersonalInfoConfirmation({messageType: "problem"})
      }
    } else {
      setPersonalInfoConfirmation({messageType: "same"})
    }
  } catch (error) {
    setPersonalInfoConfirmation({messageType: "problem"})
  }
}

export function usePersonalInfo(userType: UserType) {
  const [personalInfo, setPersonalInfo] = useState({} as PersonalInfoType)

  useEffect(() => {
    const fetchAndSetPersonalInfo = async () => {
      try {
        const storedPersonalInfoData = sessionStorage.getItem(`${userType}PersonalInfo`)
        if (storedPersonalInfoData) setPersonalInfo(JSON.parse(storedPersonalInfoData))
        else fetchPersonalInfoData(setPersonalInfo, userType)
      } catch (error) {
      }
    }

    fetchAndSetPersonalInfo()
  }, [])

  return {personalInfo, setPersonalInfo}
}
