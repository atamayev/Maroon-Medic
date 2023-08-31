import SavedConfirmationMessage from "../../../components/saved-confirmation-message"
import DeleteButton from "src/components/new-pet/delete-button"
import PetNameSection from "src/components/new-pet/pet-name-section"
import PetGenderSection from "src/components/new-pet/gender-section"
import DOBSection from "src/components/new-pet/DOB-section"
import PetTypeSection from "src/components/new-pet/pet-type-section"
import InsuranceSection from "src/components/new-pet/insurance-section"
import AddPetButton from "src/components/new-pet/add-pet-button"
import addPet from "src/helper-functions/patient/new-pet/add-pet"

interface AddPetProps {
  newPetData: PetItemForCreation
  setNewPetData: React.Dispatch<React.SetStateAction<PetItemForCreation>>
  petTypes: ServicedPetItem[]
  insurances: InsuranceItem[]
  petConfirmation: ConfirmationMessage
  setPetConfirmation: (conf: ConfirmationMessage) => void
  showAddPet: boolean
  setShowAddPet: React.Dispatch<React.SetStateAction<boolean>>
  savedPetData: SavedPetItem[]
  setSavedPetData: React.Dispatch<React.SetStateAction<SavedPetItem[]>>
}

export default function NewPet (props: AddPetProps) {
	const { newPetData, setNewPetData, petTypes, insurances, petConfirmation,
		setPetConfirmation, showAddPet, setShowAddPet, savedPetData, setSavedPetData } = props

	if (!showAddPet) return null

	return (
		<div className="bg-white shadow rounded overflow-hidden border">
			<div className = "flex justify-end mx-2 mt-2">
				<DeleteButton
					setNewPetData={setNewPetData}
					setShowAddPet={setShowAddPet}
				/>
			</div>
			<div className="p-4">
				<form
					onSubmit = {(e) => {
						e.preventDefault()
						addPet(newPetData, setNewPetData, setPetConfirmation, savedPetData, setSavedPetData, setShowAddPet)
					}}
				>
					<PetNameSection
						newPetData={newPetData}
						setNewPetData={setNewPetData}
					/>

					<PetGenderSection
						newPetData={newPetData}
						setNewPetData={setNewPetData}
					/>

					<DOBSection
						newPetData={newPetData}
						setNewPetData={setNewPetData}
					/>

					<PetTypeSection
						newPetData={newPetData}
						petTypes={petTypes}
						setNewPetData={setNewPetData}
					/>

					<InsuranceSection
						newPetData={newPetData}
						insurances={insurances}
						setNewPetData={setNewPetData}
					/>

					{/* Upload image area */}
					<AddPetButton
						newPetData={newPetData}
					/>

				</form>
				<SavedConfirmationMessage
					confirmationMessage={petConfirmation}
					whatIsBeingSaved="Pet"
				/>
			</div>
		</div>
	)
}
