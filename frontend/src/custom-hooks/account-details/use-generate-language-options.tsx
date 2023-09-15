import _ from "lodash"
import { useMemo, useContext } from "react"
import { AppContext } from "src/contexts/maroon-context"

export default function useGenerateLanguageOptions(): JSX.Element[] {
	const appContext = useContext(AppContext)

	let languagesList: LanguageItem[] | null = null
	let savedLanguages: LanguageItem[] | null = null
	if (appContext.userType === "Doctor") {
		languagesList = appContext.doctorLists?.languages || []
		savedLanguages = appContext.doctorAccountDetails?.languages || []
	} else {
		languagesList = appContext.patientLists?.languages || []
		savedLanguages = appContext.patientAccountDetails?.languages || []
	}

	return useMemo(() => {
		if (_.isNull(languagesList)) return []

		return languagesList
			.filter(
				(language) => !savedLanguages!.find(
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
