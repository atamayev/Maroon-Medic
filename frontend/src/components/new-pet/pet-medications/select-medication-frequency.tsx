import _ from "lodash"

interface Props {
	id: number
	medications: NewPetMedicationsItem[]
	setMedications: React.Dispatch<React.SetStateAction<NewPetMedicationsItem[]>>
	showFrequencyAndTimePeriod: boolean
}

export default function SelectMedicationFrequency(props: Props) {
	const { id, medications, setMedications, showFrequencyAndTimePeriod } = props

	const medicationItem = _.find(medications, ["id", id])
	const value = _.get(medicationItem, "frequencyCount", "")

	const handleSelectFrequency = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const updatedFrequency = e.target.value

		const updatedMedications = medications.map(medication => {
			if (medication.id === id) {
				return { ...medication, frequencyCount: updatedFrequency }
			}
			return medication
		})
		setMedications(updatedMedications)
	}

	if (showFrequencyAndTimePeriod === false) return null

	return (
		<select
			id="number"
			name="number"
			value={value || ""}
			onChange={handleSelectFrequency}
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
