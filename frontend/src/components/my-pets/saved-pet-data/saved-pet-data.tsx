import DeletePetModal from "../delete-pet-modal"
import SavedPetDataMap from "./saved-pet-data-map"

interface Props {
	showModal: boolean
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>
	petToDelete: SavedPetItem | null
	setPetConfirmation: (conf: ConfirmationMessage) => void
	setPetToDelete: React.Dispatch<React.SetStateAction<SavedPetItem | null>>
}

export default function SavedPetData (props: Props) {
	const { showModal, setShowModal, petToDelete, setPetConfirmation, setPetToDelete } = props

	return (
		<>
			<SavedPetDataMap
				setShowModal = {setShowModal}
				setPetToDelete = {setPetToDelete}
			/>

			<DeletePetModal
				showModal = {showModal}
				setShowModal = {setShowModal}
				petToDelete = {petToDelete}
				setPetConfirmation = {setPetConfirmation}
			/>
		</>
	)
}
