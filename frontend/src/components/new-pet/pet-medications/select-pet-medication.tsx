import _ from "lodash"
import { observer } from "mobx-react"
import { useContext, useMemo } from "react"
import AppContext from "src/contexts/maroon-context"

type NewPetMedicationsItem  = PetMedications & {
	id: number
	showFrequencyAndTimePeriod: boolean
}

interface Props {
	id: number
	medications: NewPetMedicationsItem[]
	setMedications: React.Dispatch<React.SetStateAction<NewPetMedicationsItem[]>>
}

const filterUnsavedMedications = (
	petMedicationsList: PetMedicationsItem[],
	savedPetMedications: PetMedications[]
): PetMedicationsItem[] => {
	return _.filter(petMedicationsList, (medication) => {
		return !_.some(savedPetMedications, ["petMedicationsId", medication.petMedicationsListId])
	})
}

function SelectPetMedication(props: Props) {
	const { id, medications, setMedications } = props
	const patientData = useContext(AppContext).patientData

	const filteredMedications = useMemo(() => {
		if (
			_.isNull(patientData) ||
			_.isNull(patientData.petMedications)
		) return []
		return filterUnsavedMedications(patientData.petMedications, medications)
	}, [patientData?.petMedications, medications])

	const updateOrAddMedication = (
		medications1: NewPetMedicationsItem[],
		newMedication: NewPetMedicationsItem
	): NewPetMedicationsItem[] => {
		return medications1.map((medication) => {
			if (medication.id === newMedication.id) {
				return newMedication
			}
			return medication
		})
	}

	const handleSelectOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedMedication = filteredMedications.find(
			(medication) => medication.petMedicationsListId === Number(e.target.value)
		)

		if (_.isUndefined(selectedMedication)) return

		const newMedication  = {
			id,
			showFrequencyAndTimePeriod: true,
			petMedicationsId: selectedMedication.petMedicationsListId,
			frequencyPeriod: "",
			frequencyCount: 0,
		}

		const newPetMedications = updateOrAddMedication(medications, newMedication)

		setMedications(newPetMedications)
	}

	return (
		<select
			id="pet-medication"
			name="pet-medication"
			key={medications.length}
			value={medications[id - 1]?.petMedicationsId || ""}
			onChange={handleSelectOption}
			className = "text-brown-800 bg-yellow-100 border border-brown-400 \
				rounded px-3 py-2 w-full focus:outline-none focus:border-amber-500"
		>
			<option value="" disabled className="text-brown-600">
				Choose a Pet Medication
			</option>
			{filteredMedications.map((medication) => (
				<option key={medication.petMedicationsListId} value={medication.petMedicationsListId}>
					{medication.medicationName}
				</option>
			))}
		</select>
	)
}

export default observer(SelectPetMedication)
