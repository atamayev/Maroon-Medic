import { useNavigate } from "react-router-dom"
import PrivateDoctorDataService from "../../services/private-doctor-data-service"
import PrivatePatientDataService from "../../services/private-patient-data-service"
import { handle401AxiosErrorAndSetCustomError } from "src/utils/handle-errors"

const useAssignBookingDetailsNavigateToFinalizeBooking = (): void => {
  const navigate = useNavigate()
  if ((sessionStorage.getItem("bookingDetails"))) {
    try {
      const bookingDetails = JSON.parse(sessionStorage.getItem("bookingDetails") || "{}")
      navigate("/finalize-booking", { state: bookingDetails })
    } catch (error) {
    }
  }
}

const useNewUserSubmit = (
  setError: React.Dispatch<React.SetStateAction<string>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  VetOrPatient: VetOrPatient
): { newUserSubmit: (e: React.FormEvent<HTMLFormElement>, newInfo: BirthDateInfo) => Promise<void>} => {
  const navigate = useNavigate()

  const newUserSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    newInfo: BirthDateInfo
  ): Promise<void> => {

    setError("")
    try {
      e.preventDefault()
      setLoading(true)
      let response
      if (VetOrPatient === "Vet") response = await PrivateDoctorDataService.addingDoctorInfo(newInfo)
      else response = await PrivatePatientDataService.addingPatientInfo(newInfo)

      if (response.status === 200) {
        if (VetOrPatient === "Vet") sessionStorage.setItem("DoctorPersonalInfo", JSON.stringify(newInfo))
        else sessionStorage.setItem("PatientPersonalInfo", JSON.stringify(newInfo))
        if ((sessionStorage.getItem("bookingDetails")) && VetOrPatient === "Patient") {
          useAssignBookingDetailsNavigateToFinalizeBooking()
        }
        else navigate("/dashboard")
      }
      else setError("Unable to add new user. Please reload and try again.")
    } catch (error: unknown) {
      handle401AxiosErrorAndSetCustomError(error, setError)
    }
    setLoading(false)
  }

  return { newUserSubmit }
}

export default useNewUserSubmit
