import { useEffect, useState } from "react"
import useConfirmationMessage from "../../../custom-hooks/use-confirmation-message"
import SavedConfirmationMessage from "../../../components/saved-confirmation-message"
import DescriptionInput from "src/components/doctor-account-details/description/description-input"
import SaveDescriptionButton from "src/components/doctor-account-details/description/save-description-button"
import DescriptionCharacterLimit from "src/components/doctor-account-details/description/character-limit"
import AccountDetailsCard from "src/components/account-details-card"

interface Props {
  description: string
  setDescription: React.Dispatch<React.SetStateAction<string>>
}

export default function DescriptionSection (props: Props) {
	return (
		<AccountDetailsCard
			title = "Languages"
			content = {<Description {...props} />}
		/>
	)
}

function Description(props: Props) {
	const { description, setDescription } = props
	const [isDescriptionOverLimit, setIsDescriptionOverLimit] = useState(false)
	const [descriptionConfirmation, setDescriptionConfirmation] = useConfirmationMessage()

	useEffect(() => {
		if (description || description === "") setIsDescriptionOverLimit(description.length >= 1000)
	}, [description])

	return (
		<form
			className="space-y-4"
		>
			<DescriptionInput
				description = {description}
				setDescription = {setDescription}
			/>

			<DescriptionCharacterLimit
				description = {description}
				isDescriptionOverLimit = {isDescriptionOverLimit}
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
