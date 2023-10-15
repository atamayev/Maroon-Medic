import _ from "lodash"
import { observer } from "mobx-react"
import { useContext, useMemo } from "react"
import AppContext from "src/contexts/maroon-context"

interface Props {
	id: number
	procedures: NewPetProcedureItem[]
	setProcedures: React.Dispatch<React.SetStateAction<NewPetProcedureItem[]>>
}

const filterUnsavedProcedures = (
	petProceduresList: PetProcedureItem[],
	savedPetProcedures: PetProcedure[]
): PetProcedureItem[] => {
	return _.filter(petProceduresList, (procedure) => {
		return !_.some(savedPetProcedures, ["petProceduresId", procedure.petProceduresListId])
	})
}

const updateOrAddProcedure = (
	procedures: NewPetProcedureItem[],
	newProcedure: NewPetProcedureItem
): NewPetProcedureItem[] => {
	return procedures.map((procedure) => {
		if (procedure.id === newProcedure.id) {
			return newProcedure
		}
		return procedure
	})
}

function SelectPetProcedure(props: Props) {
	const { id, procedures, setProcedures } = props
	const patientData = useContext(AppContext).patientData

	const filteredProcedures = useMemo(() => {
		if (
			_.isNull(patientData) ||
			_.isNull(patientData.petProcedures)
		) return []
		return filterUnsavedProcedures(patientData.petProcedures, procedures)
	}, [patientData?.petProcedures, procedures])


	const handleSelectOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedProcedure = filteredProcedures.find(
			(procedure) => procedure.petProceduresListId === Number(e.target.value)
		)

		if (_.isUndefined(selectedProcedure)) return

		const newProcedure  = {
			id,
			showDate: true,
			petProceduresListId: selectedProcedure.petProceduresListId,
			procedureDate: "",
		}

		const newPetProcedures = updateOrAddProcedure(procedures, newProcedure)

		setProcedures(newPetProcedures)
	}

	const procedureItem = _.find(procedures, ["id", id])
	const value = _.get(procedureItem, "petProceduresListId", "")

	return (
		<select
			id="pet-procedure"
			name="pet-procedure"
			key={procedures.length}
			value = {value || ""}
			onChange={handleSelectOption}
			className = "text-brown-800 bg-yellow-100 border border-brown-400 \
				rounded px-3 py-2 w-full focus:outline-none focus:border-amber-500"
		>
			<option value="" disabled className="text-brown-600">
				Choose a Pet Procedure
			</option>
			{filteredProcedures.map((procedure) => (
				<option key={procedure.petProceduresListId} value={procedure.petProceduresListId}>
					{procedure.procedureName}
				</option>
			))}
		</select>
	)
}

export default observer(SelectPetProcedure)
