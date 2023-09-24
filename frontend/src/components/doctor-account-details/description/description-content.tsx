import { observer } from "mobx-react"
import { useState, useContext, useEffect } from "react"
import useConfirmationMessage from "../../../custom-hooks/use-confirmation-message"
import SavedConfirmationMessage from "../../saved-confirmation-message"
import DescriptionInput from "src/components/doctor-account-details/description/description-input"
import SaveDescriptionButton from "src/components/doctor-account-details/description/save-description-button"
import DescriptionCharacterLimit from "src/components/doctor-account-details/description/character-limit"
import AppContext from "src/contexts/maroon-context"

function DescriptionContent() {
	const doctorAccountDetails = useContext(AppContext).privateDoctorData?.doctorAccountDetails
	const [description, setDescription] = useState(doctorAccountDetails?.description || "")
	const [descriptionConfirmation, setDescriptionConfirmation] = useConfirmationMessage()

	useEffect(() => {
		setDescription(doctorAccountDetails?.description || "")
	}, [doctorAccountDetails])

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

export default observer(DescriptionContent)
