import { useState } from "react"

interface Props {
	id: number
	newPetData: PetItemForCreation
	setNewPetData: React.Dispatch<React.SetStateAction<PetItemForCreation>>
	showFrequencyAndTimePeriod: boolean
}

export default function SelectMedicationTimePeriod(props: Props) {
	const { id, newPetData, setNewPetData, showFrequencyAndTimePeriod } = props

	const [selectedTimePeriod, setSelectedTimePeriod] = useState<string | null>(null)

	if (showFrequencyAndTimePeriod === false) return null

	return (
		<select
			id="time-period"
			name="time-period"
			value={selectedTimePeriod || ""}
			onChange={(e) => setSelectedTimePeriod(e.target.value)}
			className="text-brown-800 bg-yellow-100 border border-brown-400 rounded px-3 py-2 \
				w-full focus:outline-none focus:border-amber-500"
		>
			<option value="" disabled className="text-brown-600">
				Choose Time Period
			</option>
			{["Day", "Week", "Month"].map((period) => (
				<option key={period} value={period}>
					{period}
				</option>
			))}
		</select>
	)
}
