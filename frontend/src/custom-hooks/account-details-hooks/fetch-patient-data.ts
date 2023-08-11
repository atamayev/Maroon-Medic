import { useEffect } from "react"
import ListsDataService from "../../services/lists-data-service"
import PrivatePatientDataService from "../../services/private-patient-data-service"
import { handle401AxiosError } from "src/utils/handle-errors"

async function FillLists(
  setListDetails: React.Dispatch<React.SetStateAction<PatientListDetails>>
): Promise<void> {
  try {
    const response = await ListsDataService.fillPatientLists()
    setListDetails(response.data)
    sessionStorage.setItem("ListDetails", JSON.stringify(response.data))
  } catch (error: unknown) {
    handle401AxiosError(error)
  }
}

async function FillPatientAccountDetails(
  setSpokenLanguages: React.Dispatch<React.SetStateAction<LanguageItem[]>>
): Promise<void> {
  try {
    const response = await PrivatePatientDataService.fillAccountDetails()
    if (response.data.languages) setSpokenLanguages(response.data.languages)
    sessionStorage.setItem("PatientAccountDetails", JSON.stringify(response.data))
  } catch (error: unknown) {
    handle401AxiosError(error)
  }
}

export function usePatientAccountDetails(
  setSpokenLanguages: React.Dispatch<React.SetStateAction<LanguageItem[]>>,
  setListDetails: React.Dispatch<React.SetStateAction<PatientListDetails>>,
  userType: DoctorOrPatientOrNull
): void {
  const fetchAndSetAccountDetails: () => void = async () => {
    try {
      const storedAccountDetails = sessionStorage.getItem("PatientAccountDetails")
      if (!storedAccountDetails) await FillPatientAccountDetails(setSpokenLanguages)

      const storedListDetails = sessionStorage.getItem("ListDetails")
      if (storedListDetails) setListDetails(JSON.parse(storedListDetails))
      else await FillLists(setListDetails)
    } catch (error) {
    }
  }

  useEffect(() => {
    if (userType !== "Patient") return
    fetchAndSetAccountDetails()
  }, [userType])
}
