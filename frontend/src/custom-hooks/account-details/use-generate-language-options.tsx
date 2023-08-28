import _ from "lodash"
import { useMemo } from "react"

export default function useGenerateLanguageOptions(languages: LanguageItem[], spokenLanguages: LanguageItem[]): JSX.Element[] {
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
