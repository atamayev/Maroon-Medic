import { useState } from "react"
import { observer } from "mobx-react"
import SelectPetMedication from "./select-pet-medication"
import SelectMedicationFrequency from "./select-medication-frequency"
import SelectMedicationTimePeriod from "./select-medication-time-period"
import Button from "src/components/button"

interface Props {
	newPetData: PetItemForCreation
	setNewPetData: React.Dispatch<React.SetStateAction<PetItemForCreation>>
}

function PetMedications(props: Props) {
	const { newPetData, setNewPetData } = props
	const [medications, setMedications] = useState<NewPetMedicationsItem[]>([])
	const nextId = medications.length ? Math.max(...medications.map(med => med.id)) + 1 : 1

	const addMedication = () => {
		setMedications([...medications, {
			id: nextId,
			showFrequencyAndTimePeriod: false,
			petMedicationsListId: 0,
			frequencyPeriod: "",
			frequencyCount: 0
		}])
	}

	const removeMedication = (id: number) => {
		setMedications(medications.filter(med => med.id !== id))
		// Update newPetData to remove the medication
	}

	return (
		<div>
			{medications.map((med) => (
				<div key={med.id}>
					<SelectPetMedication
						id={med.id}
						medications={medications}
						setMedications={setMedications}
					/>
					<SelectMedicationFrequency
						id={med.id}
						newPetData={newPetData}
						setNewPetData={setNewPetData}
						showFrequencyAndTimePeriod={med.showFrequencyAndTimePeriod}
					/>
					<SelectMedicationTimePeriod
						id={med.id}
						newPetData={newPetData}
						setNewPetData={setNewPetData}
						showFrequencyAndTimePeriod={med.showFrequencyAndTimePeriod}
					/>
					<Button
						title = "Delete Medication"
						onClick={() => removeMedication(med.id)}
						colorClass = "bg-red-500"
						hoverClass = "hover:bg-red-600"
					/>
				</div>
			))}
			<Button
				title = "Add Medication"
				onClick={addMedication}
				colorClass = "bg-green-500"
				hoverClass = "hover:bg-green-600"
			/>
		</div>
	)
}

export default observer(PetMedications)
