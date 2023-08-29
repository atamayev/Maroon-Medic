import { useEffect } from "react"

export default function useUpdateDeleteLanguageStatuses(
	deleteStatuses: DeleteStatusesDictionary,
	setDeleteStatuses: React.Dispatch<React.SetStateAction<DeleteStatusesDictionary>>,
	spokenLanguages: LanguageItem[]
): void {
	useEffect(() => {
		const newDeleteStatuses = { ...deleteStatuses }

		// Go through each status
		for (const languageListId in newDeleteStatuses) {
			// If the language Id does not exist in the spokenLanguages list, delete the status
			if (!spokenLanguages.some((language) => language.languageListId === Number(languageListId))) {
				delete newDeleteStatuses[languageListId]
			}
		}

		setDeleteStatuses(newDeleteStatuses)
	}, [spokenLanguages])
}
