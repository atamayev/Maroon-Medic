import { observer } from "mobx-react"
import { useState, useContext } from "react"
import SavedConfirmationMessage from "../../../components/saved-confirmation-message"
import useConfirmationMessage from "../../../custom-hooks/use-confirmation-message"
import SavedLanguageList from "src/components/language/saved-languages-list"
import useUpdateDeleteLanguageStatuses from "src/custom-hooks/account-details/use-update-delete-language-statuses"
import useDeleteLanguage from "src/custom-hooks/account-details/callbacks/use-delete-language"
import useAddLanguage from "src/custom-hooks/account-details/callbacks/use-add-language"
import SelectLanguage from "src/components/language/select-language"
import AccountDetailsCard from "src/components/account-details-card"
import AppContext from "src/contexts/maroon-context"

export default function PatientLanguageSection() {
	return (
		<AccountDetailsCard
			title = "Languages"
			content = {<PatientLanguages />}
		/>
	)
}

function PatientLanguages() {
	const patientData = useContext(AppContext).patientData
	const patientAccountDetails = patientData?.patientAccountDetails
	const [deleteStatuses, setDeleteStatuses] = useState<DeleteStatusesDictionary>({})
	const [languagesConfirmation, setLanguagesConfirmation] = useConfirmationMessage()

	useUpdateDeleteLanguageStatuses(deleteStatuses, setDeleteStatuses, patientAccountDetails?.languages)

	const handleLanguageChange = useAddLanguage(setLanguagesConfirmation, "Patient")

	const handleDeleteLanguage = useDeleteLanguage(setLanguagesConfirmation, "Patient")

	return (
		<>
			<SelectLanguage
				handleLanguageChange = {handleLanguageChange}
			/>
			<SavedLanguageList
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

observer(PatientLanguages)
