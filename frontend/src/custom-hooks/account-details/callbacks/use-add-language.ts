import _ from "lodash"
import { useCallback, useContext } from "react"
import { AppContext } from "src/contexts/maroon-context"
import useModifyDoctorLanguages from "../save/doctor-account-details-helpers/use-modify-doctor-languages"
import useModifyPatientLanguages from "../save/patient-account-details/use-modify-patient-languages"
import PrivatePatientDataService from "src/services/private-patient-data-service"
import PrivateDoctorDataService from "src/services/private-doctor-data-service"

const useAddLanguage = (
	setLanguagesConfirmation: (conf: ConfirmationMessage) => void,
	doctorOrPatient: DoctorOrPatient
): (e: React.ChangeEvent<HTMLSelectElement>) => void => {
	const appContext = useContext(AppContext)

	const modifyDoctorLanguages = useModifyDoctorLanguages()
	const modifyPatientLanguages = useModifyPatientLanguages()

	return useCallback(
		async (e: React.ChangeEvent<HTMLSelectElement>) => {
			const selectedLanguageId = Number(e.target.value)
			if (
				(doctorOrPatient === "Doctor" && _.isNull(appContext.doctorLists)) ||
				(doctorOrPatient === "Patient" && _.isNull(appContext.patientLists))
			) return

			if (doctorOrPatient === "Doctor") {
				const selectedLanguage = appContext.doctorLists!.languages.find((lang) => lang.languageListId === selectedLanguageId)
				if (_.isUndefined(selectedLanguage)) return
				await modifyDoctorLanguages(
					PrivateDoctorDataService.addLanguage,
					selectedLanguage,
					setLanguagesConfirmation
				)
			}

			else {
				const selectedLanguage = appContext.patientLists!.languages.find((lang) => lang.languageListId === selectedLanguageId)
				if (_.isUndefined(selectedLanguage)) return
				await modifyPatientLanguages(
					PrivatePatientDataService.addLanguage,
					selectedLanguage,
					setLanguagesConfirmation
				)
			}
		}, [modifyDoctorLanguages, modifyPatientLanguages])
}

export default useAddLanguage
