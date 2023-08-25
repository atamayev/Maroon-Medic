import Button from "../button"
import deletePet from "src/helper-functions/patient/my-pets/delete-pet"

const handleCloseModal = (setShowModal: React.Dispatch<React.SetStateAction<boolean>>) => {
	setShowModal(false)
}

interface Props {
  showModal: boolean
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
  petToDelete: SavedPetItem | null
  savedPetData: SavedPetItem[]
  setSavedPetData: React.Dispatch<React.SetStateAction<SavedPetItem[]>>
  setPetConfirmation: (conf: ConfirmationMessage) => void
}

const DeletePetModal = (props: Props) => {
	const { showModal, setShowModal, petToDelete, savedPetData, setSavedPetData, setPetConfirmation } = props

	return (
		<div
			className={`${showModal ? "fixed" : "hidden"} z-50 inset-0 overflow-y-auto`}
			aria-labelledby="modal-title" role="dialog" aria-modal="true"
		>
			<div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
				<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
				<span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
				<div
					className="inline-block align-bottom bg-white rounded-lg text-left
            overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
				>
					<div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
						<div className="sm:flex sm:items-start">
							<div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
								<h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">Confirm Deletion</h3>
								<div className="mt-2">
									<p>Are you sure you want to delete {petToDelete?.Name}?</p>
								</div>
							</div>
						</div>
					</div>
					<div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
						<Button
							title="Delete"
							colorClass="bg-red-500"
							hoverClass="hover:bg-red-600"
							className = "mx-2"
							onClick={() => {
								deletePet(petToDelete!.pet_infoID, savedPetData, setSavedPetData, setPetConfirmation)
								handleCloseModal(setShowModal)
							}}
							textColor = "text-white"
						/>

						<Button
							title="Close"
							colorClass="bg-gray-500"
							hoverClass="hover:bg-gray-600"
							onClick={() => handleCloseModal(setShowModal)}
							textColor = "text-white"
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default DeletePetModal
