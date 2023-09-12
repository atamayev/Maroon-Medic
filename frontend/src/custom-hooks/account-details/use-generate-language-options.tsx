import _ from "lodash"
import { useMemo, useContext } from "react"
import { AppContext } from "src/contexts/maroon-context"

export default function useGenerateLanguageOptions(spokenLanguages: LanguageItem[]): JSX.Element[] {
	const appContext = useContext(AppContext)

	let languages: LanguageItem[] | null = null
	if (appContext.userType === "Doctor") languages = appContext.doctorLists?.languages || []
	else languages = appContext.patientLists?.languages || []

	return useMemo(() => {
		if (!(_.isArray(languages) && !_.isEmpty(languages))) return []

		return languages
			.filter((language) => !spokenLanguages.find((spoken) => spoken.languageListId === language.languageListId))
			.map((language) => (
				<option key = {language.languageListId} value = {language.languageListId}>
					{language.languageName}
				</option>
			))
	}, [languages, spokenLanguages])
}
