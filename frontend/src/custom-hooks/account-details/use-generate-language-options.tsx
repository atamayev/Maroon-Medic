import { useMemo, useContext } from "react"
import { AppContext } from "src/contexts/maroon-context"

export default function useGenerateLanguageOptions(): JSX.Element[] {
	const appContext = useContext(AppContext)

	let languagesList: LanguageItem[] = []
	let savedLanguages: LanguageItem[] = []
	if (appContext.userType === "Doctor") {
		languagesList = appContext.doctorLists?.languages || []
		savedLanguages = appContext.doctorAccountDetails?.languages || []
	} else {
		languagesList = appContext.patientLists?.languages || []
		savedLanguages = appContext.patientAccountDetails?.languages || []
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
