import Button from "src/components/button"

interface Props {
  pet: SavedPetItem
  setPetToDelete: React.Dispatch<React.SetStateAction<SavedPetItem | null>>
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

const handleShowModal = (props: Props) => {
	const {pet, setPetToDelete, setShowModal} = props
	setPetToDelete(pet)
	setShowModal(true)
}

const SavedPetDataTitle = (props: Props) => {
	const {pet, setPetToDelete, setShowModal} = props

	return (
		<div className="flex justify-between items-center p-2 bg-yellow-200 border-b border-brown-400">
			<span className="text-brown-800 font-bold">
				{pet.Name}
			</span>
			<Button
				colorClass = "bg-red-500"
				hoverClass = "hover:bg-red-600"
				title = "X"
				onClick = {() => handleShowModal({pet, setPetToDelete, setShowModal})}
				className = "float-right"
			/>
		</div>
	)
}

export default SavedPetDataTitle
