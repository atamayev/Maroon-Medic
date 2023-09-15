import _ from "lodash"
import { useContext } from "react"
import SingleSavedLanguage from "./single-saved-language"
import { AppContext } from "src/contexts/maroon-context"
import { observer } from "mobx-react"

interface SavedLanguageList {
	deleteStatuses: DeleteStatusesDictionary
	setDeleteStatuses: React.Dispatch<React.SetStateAction<DeleteStatusesDictionary>>
	handleDeleteLanguage: (language: LanguageItem) => void
}

function SavedLanguageList (props: SavedLanguageList) {
	const { deleteStatuses, setDeleteStatuses, handleDeleteLanguage } = props
	const appContext = useContext(AppContext)
	let accountDetails

	if (appContext.userType === "Patient") accountDetails = appContext.patientAccountDetails
	else if (appContext.userType === "Doctor") accountDetails = appContext.doctorAccountDetails
	else return null

	if (_.isNull(accountDetails) || _.isEmpty(accountDetails.languages)) return null

	return (
		<ul>
			{accountDetails.languages.map((language) => (
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

export default observer(SavedLanguageList)
