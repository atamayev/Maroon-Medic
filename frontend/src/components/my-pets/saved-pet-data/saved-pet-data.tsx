import _ from "lodash"
import DeletePetModal from "../delete-pet-modal"
import SavedPetDataMap from "./saved-pet-data-map"

interface Props {
  savedPetData: SavedPetItem[]
  setSavedPetData: React.Dispatch<React.SetStateAction<SavedPetItem[]>>
  showModal: boolean
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
  petToDelete: SavedPetItem | null
  setPetConfirmation: (conf: ConfirmationMessage) => void
  setPetToDelete: React.Dispatch<React.SetStateAction<SavedPetItem | null>>
}

const SavedPetData = (props: Props) => {
	const { savedPetData, setSavedPetData, showModal,
		setShowModal, petToDelete, setPetConfirmation, setPetToDelete } = props

	if (_.isEmpty(savedPetData)) return null

	return (
		<>
			<SavedPetDataMap
				savedPetData = {savedPetData}
				setSavedPetData = {setSavedPetData}
				setShowModal = {setShowModal}
				setPetToDelete = {setPetToDelete}
			/>

			<DeletePetModal
				showModal = {showModal}
				setShowModal = {setShowModal}
				petToDelete = {petToDelete}
				savedPetData = {savedPetData}
				setSavedPetData = {setSavedPetData}
				setPetConfirmation = {setPetConfirmation}
			/>
		</>
	)
}

export default SavedPetData
