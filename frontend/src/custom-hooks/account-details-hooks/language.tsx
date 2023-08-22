import _ from "lodash"
import { useEffect, useMemo } from "react"

interface DeleteStatusProps {
  [key: number]: DeleteStatuses
}

export function useUpdateDeleteLanguageStatuses(
  deleteStatuses: DeleteStatusesDictionary,
  setDeleteStatuses: React.Dispatch<React.SetStateAction<DeleteStatusProps>>,
  spokenLanguages: LanguageItem[]
) {
  useEffect(() => {
    const newDeleteStatuses = { ...deleteStatuses }

    // Go through each status
    for (const languageListID in newDeleteStatuses) {
      // If the language ID does not exist in the spokenLanguages list, delete the status
      if (!spokenLanguages.some((language) => language.language_listID === Number(languageListID))) {
        delete newDeleteStatuses[languageListID]
      }
    }

    setDeleteStatuses(newDeleteStatuses)
  }, [spokenLanguages])
}

export function useGenerateLanguageOptions(languages: LanguageItem[], spokenLanguages: LanguageItem[]): JSX.Element[] {
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
