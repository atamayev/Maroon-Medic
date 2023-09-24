import { useState } from "react"
import SavedConfirmationMessage from "../../../components/saved-confirmation-message"
import DeleteButton from "src/components/new-pet/delete-button"
import PetNameSection from "src/components/new-pet/pet-name-section"
import PetGenderSection from "src/components/new-pet/gender-section"
import DOBSection from "src/components/new-pet/DOB-section"
import PetTypeSection from "src/components/new-pet/pet-type-section"
import InsuranceSection from "src/components/new-pet/insurance-section"
import AddPetButton from "src/components/new-pet/add-pet-button"
import useAddPet from "src/custom-hooks/my-pets/use-add-pet"

interface AddPetProps {
	petConfirmation: ConfirmationMessage
	setPetConfirmation: (conf: ConfirmationMessage) => void
	showAddPet: boolean
	setShowAddPet: React.Dispatch<React.SetStateAction<boolean>>
}

export default function NewPet (props: AddPetProps) {
	const { petConfirmation,
		setPetConfirmation, showAddPet, setShowAddPet } = props

	const [newPetData, setNewPetData] = useState<PetItemForCreation>(
		{ name: "", gender:"", dateOfBirth: "", pet: "", petType: "", insuranceName: "", petListId: -1, insuranceListId: -1 }
	)

	const addPet = useAddPet()

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
						addPet(newPetData, setNewPetData, setPetConfirmation, setShowAddPet)
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
						setNewPetData={setNewPetData}
					/>

					<InsuranceSection
						newPetData={newPetData}
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
