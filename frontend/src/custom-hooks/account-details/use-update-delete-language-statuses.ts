import { useEffect } from "react"

interface DeleteStatusProps {
  [key: number]: DeleteStatuses
}

export default function useUpdateDeleteLanguageStatuses(
  deleteStatuses: DeleteStatusesDictionary,
  setDeleteStatuses: React.Dispatch<React.SetStateAction<DeleteStatusProps>>,
  spokenLanguages: LanguageItem[]
): void {
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
