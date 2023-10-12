import { useState } from "react"

interface Props {
	id: number
	newPetData: PetItemForCreation
	setNewPetData: React.Dispatch<React.SetStateAction<PetItemForCreation>>
	showFrequencyAndTimePeriod: boolean
}

export default function SelectMedicationFrequency(props: Props) {
	const { id, newPetData, setNewPetData, showFrequencyAndTimePeriod } = props

	const [selectedNumber, setSelectedNumber] = useState<string | null>(null)

	if (showFrequencyAndTimePeriod === false) return null

	return (
		<select
			id="number"
			name="number"
			value={selectedNumber || ""}
			onChange={(e) => setSelectedNumber(e.target.value)}
			className="text-brown-800 bg-yellow-100 border border-brown-400 rounded px-3 py-2 \
				w-full focus:outline-none focus:border-amber-500"
		>
			<option value="" disabled className="text-brown-600">
				Choose a Frequency
			</option>
			{["Once", "Twice", "Three Times", "Four Times", "Five Times"].map((num) => (
				<option key={num} value={num}>
					{num}
				</option>
			))}
		</select>
	)
}
