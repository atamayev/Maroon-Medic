import _ from "lodash"
import { observer } from "mobx-react"
import { useContext, useMemo } from "react"
import AppContext from "src/contexts/maroon-context"

interface Props {
	id: number
	newPetData: PetItemForCreation
	setNewPetData: React.Dispatch<React.SetStateAction<PetItemForCreation>>
	setShowFrequencyAndTimePeriod: (val: boolean) => void
}

const filterUnsavedMedications = (
	petMedicationsList: PetMedicationsItem[],
	savedPetMedications: PetMedications[]
): PetMedicationsItem[] => {
	return petMedicationsList.filter((medication) => {
		return !savedPetMedications.find(
			(savedMedication) => savedMedication.petMedicationsId === medication.petMedicationsListId
		)
	})
}

function SelectPetMedication(props: Props) {
	const { newPetData, setNewPetData, setShowFrequencyAndTimePeriod } = props
	const patientData = useContext(AppContext).patientData

	const filteredMedications = useMemo(() => {
		if (
			_.isNull(patientData) ||
			_.isNull(patientData.petMedications)
		) return []
		return filterUnsavedMedications(patientData.petMedications, newPetData.petMedications)
	}, [patientData?.petMedications, newPetData.petMedications])

	const handleSelectOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
		if (e.target.value === "") {
			setShowFrequencyAndTimePeriod(false)
			return
		}

		const selectedMedication = filteredMedications.find(
			(medication) => medication.petMedicationsListId === Number(e.target.value)
		)

		if (_.isUndefined(selectedMedication)) return

		const newPetMedications = [...newPetData.petMedications]
		const lastMedicationIndex = newPetMedications.length - 1

		if (lastMedicationIndex >= 0) {
			newPetMedications[lastMedicationIndex] = {
				...newPetMedications[lastMedicationIndex],
				petMedicationsId: selectedMedication.petMedicationsListId,
				frequencyPeriod: "",
				frequencyCount: 0,
			}
		} else {
			newPetMedications.push({
				petMedicationsId: selectedMedication.petMedicationsListId,
				frequencyPeriod: "",
				frequencyCount: 0,
			})
		}

		setNewPetData({
			...newPetData,
			petMedications: newPetMedications,
		})
		console.log(newPetData.petMedications[newPetData.petMedications.length - 1]?.petMedicationsId)

		setShowFrequencyAndTimePeriod(true)
	}


	return (
		<select
			id="pet medication"
			name="pet medication"
			key={newPetData.petMedications.length}
			value = {newPetData.petMedications[newPetData.petMedications.length - 1]?.petMedicationsId || ""}
			onChange={handleSelectOption}
			className = "text-brown-800 bg-yellow-100 border border-brown-400 \
				rounded px-3 py-2 w-full focus:outline-none focus:border-amber-500"
		>
			<option value="" className="text-brown-600">
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
