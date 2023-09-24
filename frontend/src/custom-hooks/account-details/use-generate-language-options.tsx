import _ from "lodash"
import { useMemo, useContext } from "react"
import AppContext from "src/contexts/maroon-context"

export default function useGenerateLanguageOptions(): JSX.Element[] {
	const appContext = useContext(AppContext)

	let languagesList: LanguageItem[] = []
	let savedLanguages: LanguageItem[] = []
	if (appContext.auth.userType === "Doctor" && !_.isNull(appContext.privateDoctorData)) {
		languagesList = appContext.privateDoctorData.doctorLists?.languages || []
		savedLanguages = appContext.privateDoctorData.doctorAccountDetails?.languages || []
	} else if (!_.isNull(appContext.patientData)) {
		languagesList = appContext.patientData.patientLists?.languages || []
		savedLanguages = appContext.patientData.patientAccountDetails?.languages || []
	}

	return useMemo(() => {
		return languagesList
			.filter(
				(language) => !savedLanguages.find(
					(spoken) => spoken.languageListId === language.languageListId
				)
			)
			.map((language) => (
				<option key = {language.languageListId} value = {language.languageListId}>
					{language.languageName}
				</option>
			))
	}, [languagesList, savedLanguages])
}
