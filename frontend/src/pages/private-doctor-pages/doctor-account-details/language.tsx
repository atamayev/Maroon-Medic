import _ from "lodash"
import { observer } from "mobx-react"
import { useState, useContext } from "react"
import SavedConfirmationMessage from "../../../components/saved-confirmation-message"
import useConfirmationMessage from "../../../custom-hooks/use-confirmation-message"
import SavedLanguageList from "src/components/language/saved-languages-list"
import useUpdateDeleteLanguageStatuses from "src/custom-hooks/account-details/use-update-delete-language-statuses"
import useGenerateLanguageOptions from "src/custom-hooks/account-details/use-generate-language-options"
import useDeleteLanguage from "src/custom-hooks/account-details/callbacks/use-delete-language"
import useAddLanguage from "src/custom-hooks/account-details/callbacks/use-add-language"
import SelectLanguage from "src/components/language/select-language"
import AccountDetailsCard from "src/components/account-details-card"
import { AppContext } from "src/contexts/maroon-context"

interface Props {
	spokenLanguages: LanguageItem[]
	setSpokenLanguages: React.Dispatch<React.SetStateAction<LanguageItem[]>>
}

export default function LanguageSection(props: Props) {
	return (
		<AccountDetailsCard
			title = "Languages"
			content = {<VetLanguages {...props} />}
		/>
	)
}

function VetLanguages(props: Props) {
	const { spokenLanguages, setSpokenLanguages } = props
	const { doctorLists } = useContext(AppContext)
	const [deleteStatuses, setDeleteStatuses] = useState<DeleteStatusesDictionary>({})
	const [languagesConfirmation, setLanguagesConfirmation] = useConfirmationMessage()

	useUpdateDeleteLanguageStatuses(deleteStatuses, setDeleteStatuses, spokenLanguages)

	const languageOptions = useGenerateLanguageOptions(spokenLanguages)

	if (_.isNull(doctorLists)) return null

	const handleLanguageChange = useAddLanguage(spokenLanguages, setSpokenLanguages, doctorLists, setLanguagesConfirmation, "doctor")

	const handleDeleteLanguage = useDeleteLanguage(spokenLanguages, setSpokenLanguages, setLanguagesConfirmation, "doctor")

	return (
		<>
			<SelectLanguage
				handleLanguageChange = {handleLanguageChange}
				languageOptions = {languageOptions}
			/>
			<SavedLanguageList
				spokenLanguages = {spokenLanguages}
				deleteStatuses = {deleteStatuses}
				setDeleteStatuses = {setDeleteStatuses}
				handleDeleteLanguage = {handleDeleteLanguage}
			/>
			<SavedConfirmationMessage
				confirmationMessage = {languagesConfirmation}
				whatIsBeingSaved = "Languages"
			/>
		</>
	)
}

observer(VetLanguages)
