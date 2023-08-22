import { useEffect } from "react"
import fetchPatientAccountDetails from "src/helper-functions/account-details/fetch/fetch-patient-account-details"
import fetchPatientLists from "src/helper-functions/account-details/fetch/fetch-patient-lists"

export function usePatientAccountDetails(
  setSpokenLanguages: React.Dispatch<React.SetStateAction<LanguageItem[]>>,
  setListDetails: React.Dispatch<React.SetStateAction<PatientListDetails>>,
  userType: DoctorOrPatientOrNull
): void {
  const fetchAndSetAccountDetails: () => void = async () => {
    try {
      const storedAccountDetails = sessionStorage.getItem("PatientAccountDetails")
      if (!storedAccountDetails) await fetchPatientAccountDetails(setSpokenLanguages)

      const storedListDetails = sessionStorage.getItem("ListDetails")
      if (storedListDetails) setListDetails(JSON.parse(storedListDetails))
      else await fetchPatientLists(setListDetails)
    } catch (error) {
    }
  }

  useEffect(() => {
    if (userType !== "Patient") return
    fetchAndSetAccountDetails()
  }, [userType])
}
