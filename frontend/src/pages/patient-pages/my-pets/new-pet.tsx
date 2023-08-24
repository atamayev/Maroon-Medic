import SavedConfirmationMessage from "../../../components/saved-confirmation-message"
import DeleteButton from "src/components/new-pet/delete-button"
import PetNameSection from "src/components/new-pet/name-section"
import PetGenderSection from "src/components/new-pet/gender-section"
import DOBSection from "src/components/new-pet/DOB-section"
import PetTypeSection from "src/components/new-pet/pet-type-section"
import InsuranceSection from "src/components/new-pet/insurance-section"
import AddPetButton from "src/components/new-pet/add-pet-button"

interface AddPetProps {
  newPetData: PetItemForCreation
  setNewPetData: React.Dispatch<React.SetStateAction<PetItemForCreation>>
  petTypes: ServicedPetItem[]
  insurances: InsuranceItem[]
  petConfirmation: ConfirmationMessage
  setPetConfirmation: (conf: ConfirmationMessage) => void
  setShowAddPet: React.Dispatch<React.SetStateAction<boolean>>
  savedPetData: SavedPetItem[]
  setSavedPetData: React.Dispatch<React.SetStateAction<SavedPetItem[]>>
}

const NewPet = (props: AddPetProps) => {
	const { newPetData, setNewPetData, petTypes, insurances, petConfirmation,
		setPetConfirmation, setShowAddPet, savedPetData, setSavedPetData } = props

	return (
		<div className="bg-white shadow rounded overflow-hidden">
			<div className="container mx-auto px-4">
				<div className="flex flex-row">
					<div className="flex-grow"></div>
					<div className="w-1/3">
						<DeleteButton
							setNewPetData={setNewPetData}
							setShowAddPet={setShowAddPet}
						/>
					</div>
				</div>
			</div>
			<div className="p-4">
				<form>
					<PetNameSection
						newPetData={newPetData}
						petTypes={petTypes}
						insurances={insurances}
						setNewPetData={setNewPetData}
					/>

					<PetGenderSection
						newPetData={newPetData}
						petTypes={petTypes}
						insurances={insurances}
						setNewPetData={setNewPetData}
					/>

					<DOBSection
						newPetData={newPetData}
						petTypes={petTypes}
						insurances={insurances}
						setNewPetData={setNewPetData}
					/>

					<PetTypeSection
						newPetData={newPetData}
						petTypes={petTypes}
						insurances={insurances}
						setNewPetData={setNewPetData}
					/>

					<InsuranceSection
						newPetData={newPetData}
						petTypes={petTypes}
						insurances={insurances}
						setNewPetData={setNewPetData}
					/>

					{/* Upload image area */}
					<AddPetButton
						newPetData={newPetData}
						setNewPetData={setNewPetData}
						setPetConfirmation={setPetConfirmation}
						setShowAddPet={setShowAddPet}
						savedPetData={savedPetData}
						setSavedPetData={setSavedPetData}
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

export default NewPet
