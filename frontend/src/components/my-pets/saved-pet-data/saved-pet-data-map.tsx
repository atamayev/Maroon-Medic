import SavedPetDataTitle from "./saved-pet-data-title"
import SavedPetDataText from "./saved-pet-data-text"

interface Props {
  savedPetData: SavedPetItem[]
  setSavedPetData: React.Dispatch<React.SetStateAction<SavedPetItem[]>>
  setPetToDelete: React.Dispatch<React.SetStateAction<SavedPetItem | null>>
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

export default function SavedPetDataMap (props: Props) {
	const { savedPetData, setPetToDelete, setShowModal } = props

	return (
		<div className="flex flex-wrap">
			{savedPetData.map((pet) => (
				<div
					key={pet.petInfoId}
					className="m-3 bg-yellow-100 border border-brown-400 rounded"
					style={{ width: "18rem", marginTop: "10px" }}
				>
					<div className="p-4">
						<SavedPetDataTitle pet={pet} setPetToDelete={setPetToDelete} setShowModal={setShowModal} />
						<SavedPetDataText pet={pet} />
					</div>
				</div>
			))}
		</div>
	)
}

