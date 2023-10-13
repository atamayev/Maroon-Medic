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
import PetProcedures from "src/components/new-pet/pet-procedures/pet-procedures"
import PetMedications from "src/components/new-pet/pet-medications/pet-medications"

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
		{ name: "", gender:"", dateOfBirth: "", pet: "", petType: "",
			insuranceName: "", petListId: -1, insuranceListId: -1,
			petMedications: [], petProcedures: []
		}
	)
	const [medications, setMedications] = useState<NewPetMedicationsItem[]>([])
	const [procedures, setProcedures] = useState<NewPetProceduresItem[]>([])

	const addPet = useAddPet()
	console.log(procedures)
	if (showAddPet === false) return null

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
						addPet(newPetData, setNewPetData, medications, procedures, setPetConfirmation, setShowAddPet)
					}}
				>
					<div className = "flex">
						<div className = "w-1/3">
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

						</div>

						<div className = "w-1/3 mx-10">
							<PetMedications
								medications={medications}
								setMedications={setMedications}
							/>
						</div>

						<div className = "w-1/3">
							<PetProcedures
								procedures={procedures}
								setProcedures={setProcedures}
							/>
						</div>
					</div>

					<div className="flex justify-end">
						<AddPetButton
							newPetData={newPetData}
							medications={medications}
							procedures={procedures}
						/>
					</div>

				</form>
				<SavedConfirmationMessage
					confirmationMessage={petConfirmation}
					whatIsBeingSaved="Pet"
				/>
			</div>
		</div>
	)
}
