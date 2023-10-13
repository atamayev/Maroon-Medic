import { useState } from "react"
import { observer } from "mobx-react"
import Button from "src/components/button"
import SelectPetProcedure from "./select-pet-procedure"
import SelectProcedureDate from "./select-procedure-date"

interface Props {
	newPetData: PetItemForCreation
	setNewPetData: React.Dispatch<React.SetStateAction<PetItemForCreation>>
}

function PetProcedures(props: Props) {
	const { newPetData, setNewPetData } = props
	const [procedures, setProcedures] = useState<NewPetProceduresItem[]>([])
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
						newPetData={newPetData}
						setNewPetData={setNewPetData}
						showDate={med.showDate}
					/>
					<Button
						title = "Delete Procedure"
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
