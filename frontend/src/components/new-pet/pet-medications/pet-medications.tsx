import _ from "lodash"
import { useContext } from "react"
import { observer } from "mobx-react"
import SelectPetMedication from "./select-pet-medication"
import SelectMedicationFrequency from "./select-medication-frequency"
import SelectMedicationTimePeriod from "./select-medication-time-period"
import Button from "src/components/button"
import AppContext from "src/contexts/maroon-context"

interface Props {
	medications: NewPetMedicationItem[]
	setMedications: React.Dispatch<React.SetStateAction<NewPetMedicationItem[]>>
}

function PetMedications(props: Props) {
	const { medications, setMedications } = props
	const patientData = useContext(AppContext).patientData
	const nextId = medications.length ? Math.max(...medications.map(med => med.id)) + 1 : 1

	const addMedication = () => {
		setMedications([...medications, {
			id: nextId,
			showFrequencyAndTimePeriod: false,
			petMedicationListId: 0,
			frequencyPeriod: "",
			frequencyCount: ""
		}])
	}

	const removeMedication = (id: number) => {
		setMedications(medications.filter(med => med.id !== id))
	}

	function DeleteMedicationTitle (id: number) {
		const medicationItem = medications.find(med => med.id === id)
		if (_.isUndefined(medicationItem)) return ""

		const petMedListId = medicationItem.petMedicationListId

		const matchingPetMedication = patientData?.petMedications?.find(
			med => med.petMedicationListId === petMedListId
		)

		return "Delete " + _.get(matchingPetMedication, "medicationName", "")
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
						medications={medications}
						setMedications={setMedications}
						showFrequencyAndTimePeriod={med.showFrequencyAndTimePeriod}
					/>
					<SelectMedicationTimePeriod
						id={med.id}
						medications={medications}
						setMedications={setMedications}
						showFrequencyAndTimePeriod={med.showFrequencyAndTimePeriod}
					/>
					<Button
						title = {DeleteMedicationTitle(med.id)}
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
