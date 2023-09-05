import _ from "lodash"
import SingleSavedLanguage from "./single-saved-language"

interface SavedLanguageList {
	spokenLanguages: LanguageItem[],
	deleteStatuses: DeleteStatusesDictionary,
	setDeleteStatuses: React.Dispatch<React.SetStateAction<DeleteStatusesDictionary>>
	handleDeleteLanguage: (language: LanguageItem) => void
}

export default function SavedLanguageList (props: SavedLanguageList) {
	const { spokenLanguages, deleteStatuses, setDeleteStatuses, handleDeleteLanguage } = props

	if (!_.isArray(spokenLanguages) || _.isEmpty(spokenLanguages)) return null

	return (
		<ul>
			{spokenLanguages.map((language) => (
				<SingleSavedLanguage
					key = {language.languageListId}
					language = {language}
					deleteStatuses = {deleteStatuses}
					setDeleteStatuses = {setDeleteStatuses}
					handleDeleteLanguage = {handleDeleteLanguage}
				/>
			))}
		</ul>
	)
}