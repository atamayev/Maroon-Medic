import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import PrivateDoctorDataService from "../../services/private-doctor-data-service"
import PrivatePatientDataService from "../../services/private-patient-data-service"
import handle401AxiosErrorAndSetCustomError from "src/utils/handle-errors/handle-401-axios-error-and-set-custom-error"
import { AppContext } from "src/contexts/maroon-context"

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
	const appContext = useContext(AppContext)

	const newUserSubmit = async (
		e: React.FormEvent<HTMLFormElement>,
		newInfo: BirthDateInfo
	): Promise<void> => {
		setError("")
		e.preventDefault()
		setLoading(true)

		try {
			let response
			if (VetOrPatient === "Vet") response = await PrivateDoctorDataService.addNewDoctorInfo(newInfo)
			else response = await PrivatePatientDataService.addNewPatientInfo(newInfo)

			if (response.status === 200) {
				appContext.initializePersonalInfo(newInfo)
				// if (VetOrPatient === "Vet") {
				// 	// appContext.userType = "Doctor"
				// 	appContext.initializePersonalInfo(newInfo)
				// }
				// else {
				// 	// appContext.userType = "Patient"
				// 	appContext.initializePersonalInfo(newInfo)
				// }
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
