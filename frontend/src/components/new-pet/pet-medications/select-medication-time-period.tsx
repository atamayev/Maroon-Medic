import _ from "lodash"

interface Props {
	id: number
	medications: NewPetMedicationsItem[]
	setMedications: React.Dispatch<React.SetStateAction<NewPetMedicationsItem[]>>
	showFrequencyAndTimePeriod: boolean
}

export default function SelectMedicationTimePeriod(props: Props) {
	const { id, medications, setMedications, showFrequencyAndTimePeriod } = props

	const medicationItem = _.find(medications, ["id", id])
	const value = _.get(medicationItem, "frequencyPeriod", "")

	const handleSelectTimePeriod = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const updatedMedications = medications.map(medication => {
			if (medication.id === id) {
				return { ...medication, frequencyPeriod: e.target.value }
			}
			return medication
		})
		setMedications(updatedMedications)
	}

	if (showFrequencyAndTimePeriod === false) return null

	return (
		<select
			id="time-period"
			name="time-period"
			value={value || ""}
			onChange={handleSelectTimePeriod}
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
