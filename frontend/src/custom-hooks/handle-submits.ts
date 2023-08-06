import { NavigateFunction } from "react-router-dom"
import AuthDataService from "../services/auth-data-service"
import PrivateDoctorDataService from "../services/private-doctor-data-service"
import PrivatePatientDataService from "../services/private-patient-data-service"
import { handle401AxiosErrorAndSetCustomError } from "src/utils/handle-errors"

export const handleLoginSubmit = async (
  loginInformationObject: LoginAndRegisterInformationType,
  navigate: NavigateFunction,
  setError: React.Dispatch<React.SetStateAction<string>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  VetOrPatient: VetOrPatient
): Promise<void> => {
  setError("")
  try {
    setLoading(true)
    const response = await AuthDataService.login(loginInformationObject)
    if (response.status === 200) {
      if ((sessionStorage.getItem("bookingDetails") !== null) && VetOrPatient === "Patient") {
        let bookingDetails
        try {
          bookingDetails = JSON.parse(sessionStorage.getItem("bookingDetails") ?? "{}")
        } catch (error) {
        }
        navigate("/finalize-booking", { state: bookingDetails })
      }
      else navigate(`/${VetOrPatient.toLowerCase()}-dashboard`)
    }
    else setError("Login didn't work")
  } catch (error: unknown) {
    handle401AxiosErrorAndSetCustomError(error, setError)
  }
  setLoading(false)
}

export const handleRegisterSubmit = async (
  registerInformationObject: LoginAndRegisterInformationType,
  passwordConfirm: string,
  navigate: NavigateFunction,
  setError: React.Dispatch<React.SetStateAction<string>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  VetOrPatient: VetOrPatient
): Promise<void> => {
  setError("")
  if (registerInformationObject.password !== passwordConfirm) return setError("Passwords do not match")
  try {
    setLoading(true)
    const response = await AuthDataService.register(registerInformationObject)
    if (response.status === 200) navigate(`/new-${VetOrPatient.toLowerCase()}`)
    else setError("Registration didn't work")
  } catch (error: unknown) {
    handle401AxiosErrorAndSetCustomError(error, setError)
  }
  setLoading(false)
}

export const handleNewUserSubmit = async (
  newInfo: PersonalInfoType,
  navigate: NavigateFunction,
  setError: React.Dispatch<React.SetStateAction<string>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  VetOrPatient: VetOrPatient
): Promise<void> => {
  setError("")
  try {
    setLoading(true)
    let response
    if (VetOrPatient === "Vet") response = await PrivateDoctorDataService.addingDoctorInfo(newInfo)
    else if (VetOrPatient === "Patient") response = await PrivatePatientDataService.addingPatientInfo(newInfo)

    if (response && response.status === 200) {
      if (VetOrPatient === "Vet") sessionStorage.setItem("DoctorPersonalInfo", JSON.stringify(newInfo))
      else if (VetOrPatient === "Patient") sessionStorage.setItem("PatientPersonalInfo", JSON.stringify(newInfo))
      if ((sessionStorage.getItem("bookingDetails")) && VetOrPatient === "Patient") {
        try {
          const bookingDetails = JSON.parse(sessionStorage.getItem("bookingDetails") || "{}")
          navigate("/finalize-booking", { state: bookingDetails })
        } catch (error) {
        }
      }
      else navigate(`/${VetOrPatient.toLowerCase()}-dashboard`)
    }
    else setError("Unable to add new user. Please reload and try again.")
  } catch (error: unknown) {
    handle401AxiosErrorAndSetCustomError(error, setError)
  }
  setLoading(false)
}
