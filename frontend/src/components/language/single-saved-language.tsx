import DeleteButtonOptions from "../delete-buttons/delete-button-options"

interface SingleLanguageProps {
  language: LanguageItem,
  deleteStatuses: DeleteStatusesDictionary,
  setDeleteStatuses: React.Dispatch<React.SetStateAction<DeleteStatusesDictionary>>
  handleDeleteLanguage: (language: LanguageItem) => void
}

const SingleSavedLanguage = (props: SingleLanguageProps) => {
	const { language, deleteStatuses, setDeleteStatuses, handleDeleteLanguage } = props

	const status = deleteStatuses[language.language_listID] || "initial"

	const setStatus = (newStatus: DeleteStatuses) => {
		setDeleteStatuses((prevStatuses) => ({
			...prevStatuses,
			[language.language_listID]: newStatus,
		}))
	}

	return (
		<li>
			{language.languageName}
			<DeleteButtonOptions<LanguageItem>
				status = {status}
				setStatus = {setStatus}
				dataType = {language}
				handleDeleteOnClick = {handleDeleteLanguage}
			/>
		</li>
	)
}

export default SingleSavedLanguage
