import _ from "lodash"
import { useContext } from "react"
import { observer } from "mobx-react"
import AppContext from "src/contexts/maroon-context"

interface Props {
	newPetData: PetItemForCreation
	setNewPetData: React.Dispatch<React.SetStateAction<PetItemForCreation>>
}

function PastPetProcedures(props: Props) {
	const { newPetData, setNewPetData } = props
	const petProcedures = useContext(AppContext).patientData?.petProcedures

	if (_.isNil(petProcedures)) return null

	return (
		<div>pet-PastPetProcedures</div>
	)
}

export default observer(PastPetProcedures)
