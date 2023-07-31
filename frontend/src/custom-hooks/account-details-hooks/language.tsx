import _ from "lodash"
import { useEffect, useMemo } from "react"

export function useUpdateDeleteStatuses(
  deleteStatuses,
  setDeleteStatuses,
  spokenLanguages: LanguageItemType[]
) {
  useEffect(() => {
    const newDeleteStatuses = { ...deleteStatuses }

    // Go through each status
    for (const languageListID in newDeleteStatuses) {
      // If the language ID does not exist in the spokenLanguages list, delete the status
      if (!spokenLanguages.some((language) => language.language_listID === languageListID)) {
        delete newDeleteStatuses[languageListID]
      }
    }

    setDeleteStatuses(newDeleteStatuses)
  }, [spokenLanguages])
}

export function useLanguageOptions(languages: LanguageItemType[], spokenLanguages: LanguageItemType[]): JSX.Element[] {
  return useMemo(() => {
    if (!(_.isArray(languages) && !_.isEmpty(languages))) return []

    return languages
      .filter((language) => !spokenLanguages.find((spoken) => spoken.language_listID === language.language_listID))
      .map((language) => (
        <option key = {language?.language_listID} value = {language?.language_listID}>
          {language?.Language_name}
        </option>
      ))
  }, [languages, spokenLanguages])
}
