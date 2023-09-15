import _ from "lodash"
import { observer } from "mobx-react"
import { useState, useContext, useEffect } from "react"
import useConfirmationMessage from "../../../custom-hooks/use-confirmation-message"
import SavedConfirmationMessage from "../../../components/saved-confirmation-message"
import DescriptionInput from "src/components/doctor-account-details/description/description-input"
import SaveDescriptionButton from "src/components/doctor-account-details/description/save-description-button"
import DescriptionCharacterLimit from "src/components/doctor-account-details/description/character-limit"
import AccountDetailsCard from "src/components/account-details-card"
import { AppContext } from "src/contexts/maroon-context"

export default function DescriptionSection() {
	return (
		<AccountDetailsCard
			title = "Description"
			content = {<Description />}
		/>
	)
}

function Description() {
	const { doctorAccountDetails } = useContext(AppContext)
	const [description, setDescription] = useState(doctorAccountDetails?.description || "")
	const [descriptionConfirmation, setDescriptionConfirmation] = useConfirmationMessage()

	useEffect(() => {
		if (_.isNull(doctorAccountDetails)) return
		setDescription(doctorAccountDetails.description)
	}, [doctorAccountDetails?.description])

	return (
		<form className="space-y-4">
			<DescriptionInput
				description = {description}
				setDescription = {setDescription}
			/>

			<DescriptionCharacterLimit
				description = {description}
			/>

			<SaveDescriptionButton
				description = {description}
				setDescriptionConfirmation = {setDescriptionConfirmation}
			/>

			<SavedConfirmationMessage
				confirmationMessage = {descriptionConfirmation}
				whatIsBeingSaved = "Description"
			/>
		</form>
	)
}

observer(Description)
