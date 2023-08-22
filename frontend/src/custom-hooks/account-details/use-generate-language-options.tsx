import _ from "lodash"
import { useMemo } from "react"

export default function useGenerateLanguageOptions(languages: LanguageItem[], spokenLanguages: LanguageItem[]): JSX.Element[] {
  return useMemo(() => {
    if (!(_.isArray(languages) && !_.isEmpty(languages))) return []

    return languages
      .filter((language) => !spokenLanguages.find((spoken) => spoken.language_listID === language.language_listID))
      .map((language) => (
        <option key = {language.language_listID} value = {language.language_listID}>
          {language.Language_name}
        </option>
      ))
  }, [languages, spokenLanguages])
}
