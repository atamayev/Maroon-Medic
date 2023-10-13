import { useState } from "react"
import FormGroup from "src/components/form-group"

interface Props {
	id: number
	newPetData: PetItemForCreation
	setNewPetData: React.Dispatch<React.SetStateAction<PetItemForCreation>>
	showDate: boolean
}

export default function SelectProcedureDate(props: Props) {
	const { id, newPetData, setNewPetData, showDate } = props

	const [selectedDate, setSelectedDate] = useState<string | null>(null)

	if (showDate === false) return null

	return (
		<FormGroup
			id = "formPetDob"
			className = "mb-3"
			label = "Procedure Date"
			type = "date"
			onChange = {(e) => setSelectedDate(e.target.value)}
			name = "dateOfBirth"
			value = {selectedDate || ""}
			required
		/>
	)
}
