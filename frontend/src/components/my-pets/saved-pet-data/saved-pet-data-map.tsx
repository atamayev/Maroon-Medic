import _ from "lodash"
import { useContext } from "react"
import { observer } from "mobx-react"
import SavedPetDataTitle from "./saved-pet-data-title"
import SavedPetDataText from "./saved-pet-data-text"
import AppContext from "src/contexts/maroon-context"

interface Props {
	setPetToDelete: React.Dispatch<React.SetStateAction<SavedPetItem | null>>
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

function SavedPetDataMap (props: Props) {
	const { setPetToDelete, setShowModal } = props
	const { patientData } = useContext(AppContext)

	if (_.isNull(patientData)) return null

	return (
		<div className="flex flex-wrap">
			{patientData.patientPetData.map((pet) => (
				<div
					key={pet.petInfoId}
					className="m-3 bg-yellow-100 border border-brown-400 rounded mt-3 w-72"
				>
					<div className="p-4">
						<SavedPetDataTitle
							pet = {pet}
							setPetToDelete = {setPetToDelete}
							setShowModal = {setShowModal}
						/>
						<SavedPetDataText pet = {pet} />
					</div>
				</div>
			))}
		</div>
	)
}

export default observer(SavedPetDataMap)
