import { useState } from "react"
import UnauthorizedUser from "../../../components/unauthorized-user/unauthorized-user"
import useConfirmationMessage from "../../../custom-hooks/use-confirmation-message"
import useSimpleUserVerification from "../../../custom-hooks/use-simple-user-verification"
import useFetchPetData from "src/custom-hooks/use-fetch-pet-data"
import Header from "../../../components/header/header"
import PatientHeader from "../patient-header"
import NewPet from "./new-pet"
import ShowAddPet from "src/components/my-pets/show-add-pet"
import SavedPetData from "src/components/my-pets/saved-pet-data/saved-pet-data"

export default function MyPets() {
	const { userType } = useSimpleUserVerification()
	const [petConfirmation, setPetConfirmation] = useConfirmationMessage()
	const [newPetData, setNewPetData] = useState<PetItemForCreation>(
		{Name: "", Gender:"", DOB: "", Pet: "", Pet_type: "", insuranceName: "", pet_listID: -1, insurance_listID: -1}
	)
	const [showAddPet, setShowAddPet] = useState(false)
	const [showModal, setShowModal] = useState(false)
	const [petToDelete, setPetToDelete] = useState<SavedPetItem | null>(null)
	const { savedPetData, setSavedPetData, petTypes, insurances } = useFetchPetData(userType)
	if (userType !== "Patient") return <UnauthorizedUser vetOrpatient = {"patient"}/>

	const AddPet = () => {
		if (!showAddPet) return null
		return (
			<NewPet
				newPetData = {newPetData}
				setNewPetData = {setNewPetData}
				petTypes = {petTypes}
				insurances = {insurances}
				petConfirmation = {petConfirmation}
				setPetConfirmation = {setPetConfirmation}
				setShowAddPet = {setShowAddPet}
				savedPetData = {savedPetData}
				setSavedPetData = {setSavedPetData}
			/>
		)
	}

	return (
		<>
			<Header dropdown = {true} search = {true}/>
			<PatientHeader/>

			<SavedPetData
				savedPetData = {savedPetData}
				setSavedPetData = {setSavedPetData}
				showModal = {showModal}
				setShowModal = {setShowModal}
				petToDelete = {petToDelete}
				setPetConfirmation = {setPetConfirmation}
				setPetToDelete = {setPetToDelete}
			/>

			<ShowAddPet showAddPet = {showAddPet} setShowAddPet = {setShowAddPet} />
			<AddPet />
		</>
	)
}
