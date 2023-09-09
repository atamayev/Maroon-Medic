import { useContext, useState } from "react"
import UnauthorizedUser from "../../../components/unauthorized-user/unauthorized-user"
import useConfirmationMessage from "../../../custom-hooks/use-confirmation-message"
import useFetchPetData from "src/custom-hooks/use-fetch-pet-data"
import PatientHeader from "../patient-header"
import NewPet from "./new-pet"
import ShowAddPet from "src/components/my-pets/show-add-pet"
import SavedPetData from "src/components/my-pets/saved-pet-data/saved-pet-data"
import { AppContext } from "src/contexts/maroon-context"
import { observer } from "mobx-react"

function MyPets() {
	const appContext = useContext(AppContext)
	const [petConfirmation, setPetConfirmation] = useConfirmationMessage()
	const [newPetData, setNewPetData] = useState<PetItemForCreation>(
		{ name: "", gender:"", dateOfBirth: "", pet: "", petType: "", insuranceName: "", petListId: -1, insuranceListId: -1 }
	)
	const [showAddPet, setShowAddPet] = useState(false)
	const [showModal, setShowModal] = useState(false)
	const [petToDelete, setPetToDelete] = useState<SavedPetItem | null>(null)
	const { savedPetData, setSavedPetData, petTypes, insurances } = useFetchPetData(appContext.userType)

	if (appContext.userType !== "Patient") return <UnauthorizedUser vetOrpatient = {"patient"}/>

	return (
		<>
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
			<NewPet
				newPetData = {newPetData}
				setNewPetData = {setNewPetData}
				petTypes = {petTypes}
				insurances = {insurances}
				petConfirmation = {petConfirmation}
				setPetConfirmation = {setPetConfirmation}
				showAddPet = {showAddPet}
				setShowAddPet = {setShowAddPet}
				savedPetData = {savedPetData}
				setSavedPetData = {setSavedPetData}
			/>
		</>
	)
}

export default observer(MyPets)
