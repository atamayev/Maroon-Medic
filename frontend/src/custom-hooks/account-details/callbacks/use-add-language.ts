/* eslint-disable complexity */
import _ from "lodash"
import { useCallback, useContext } from "react"
import AppContext from "src/contexts/maroon-context"
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
				(doctorOrPatient === "Doctor" && _.isNil(appContext.privateDoctorData?.doctorLists)) ||
				(doctorOrPatient === "Patient" && _.isNil(appContext.patientData?.patientLists))
			) return

			if (doctorOrPatient === "Doctor") {
				if (_.isNull(appContext.privateDoctorData) || _.isNull(appContext.privateDoctorData.doctorLists)) return
				const selectedLanguage = appContext.privateDoctorData.doctorLists.languages.find(
					(lang) => lang.languageListId === selectedLanguageId
				)
				if (_.isUndefined(selectedLanguage)) return
				await modifyDoctorLanguages(
					PrivateDoctorDataService.addLanguage,
					selectedLanguage,
					setLanguagesConfirmation
				)
			} else {
				if (_.isNull(appContext.patientData) || _.isNull(appContext.patientData.patientLists)) return

				const selectedLanguage = appContext.patientData.patientLists.languages.find(
					(lang) => lang.languageListId === selectedLanguageId
				)
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
