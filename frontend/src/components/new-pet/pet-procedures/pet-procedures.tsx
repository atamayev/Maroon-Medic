import { observer } from "mobx-react"
import Button from "src/components/button"
import SelectPetProcedure from "./select-pet-procedure"
import SelectProcedureDate from "./select-procedure-date"
import { useContext } from "react"
import AppContext from "src/contexts/maroon-context"
import _ from "lodash"

interface Props {
	procedures: NewPetProceduresItem[]
	setProcedures: React.Dispatch<React.SetStateAction<NewPetProceduresItem[]>>
}

function PetProcedures(props: Props) {
	const { procedures, setProcedures } = props
	const patientData = useContext(AppContext).patientData
	const nextId = procedures.length ? Math.max(...procedures.map(med => med.id)) + 1 : 1

	const addProcedure = () => {
		setProcedures([...procedures, {
			id: nextId,
			showDate: false,
			petProceduresListId: 0,
			procedureDate: "",
		}])
	}

	const removeProcedure = (id: number) => {
		setProcedures(procedures.filter(med => med.id !== id))
		// Update newPetData to remove the medication
	}

	function DeleteProcedureTitle (id: number) {
		const medicationItem = procedures.find(med => med.id === id)
		if (_.isUndefined(medicationItem)) return ""

		const petMedListId = medicationItem.petProceduresListId

		const matchingPetMedication = patientData?.petProcedures?.find(
			med => med.petProceduresListId === petMedListId
		)

		return "Delete " + _.get(matchingPetMedication, "procedureName", "")
	}

	return (
		<div>
			{procedures.map((med) => (
				<div key={med.id}>
					<SelectPetProcedure
						id={med.id}
						procedures={procedures}
						setProcedures={setProcedures}
					/>
					<SelectProcedureDate
						id={med.id}
						procedures={procedures}
						setProcedures={setProcedures}
						showDate={med.showDate}
					/>
					<Button
						title = {DeleteProcedureTitle(med.id)}
						onClick={() => removeProcedure(med.id)}
						colorClass = "bg-red-500"
						hoverClass = "hover:bg-red-600"
					/>
				</div>
			))}
			<Button
				title = "Add Procedure"
				onClick={addProcedure}
				colorClass = "bg-green-500"
				hoverClass = "hover:bg-green-600"
			/>
		</div>
	)
}

export default observer(PetProcedures)
