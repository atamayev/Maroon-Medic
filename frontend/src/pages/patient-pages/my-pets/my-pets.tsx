import { observer } from "mobx-react"
import { useContext, useState } from "react"
import UnauthorizedUser from "../../../components/unauthorized-user/unauthorized-user"
import useConfirmationMessage from "../../../custom-hooks/use-confirmation-message"
import useFetchAllPetData from "src/custom-hooks/use-fetch-all-pet-data"
import PatientHeader from "../patient-header"
import ShowAddPet from "src/components/my-pets/show-add-pet"
import SavedPetData from "src/components/my-pets/saved-pet-data/saved-pet-data"
import { AppContext } from "src/contexts/maroon-context"
import NewPet from "./new-pet"

function MyPets() {
	const appContext = useContext(AppContext)
	const [petConfirmation, setPetConfirmation] = useConfirmationMessage()
	const [showAddPet, setShowAddPet] = useState(false)
	const [showModal, setShowModal] = useState(false)
	const [petToDelete, setPetToDelete] = useState<SavedPetItem | null>(null)
	useFetchAllPetData()

	if (appContext.userType !== "Patient") return <UnauthorizedUser vetOrpatient = {"patient"}/>

	return (
		<>
			<PatientHeader/>

			<SavedPetData
				showModal = {showModal}
				setShowModal = {setShowModal}
				petToDelete = {petToDelete}
				setPetConfirmation = {setPetConfirmation}
				setPetToDelete = {setPetToDelete}
			/>

			<ShowAddPet showAddPet = {showAddPet} setShowAddPet = {setShowAddPet} />
			<NewPet
				petConfirmation = {petConfirmation}
				setPetConfirmation = {setPetConfirmation}
				showAddPet = {showAddPet}
				setShowAddPet = {setShowAddPet}
			/>
		</>
	)
}

export default observer(MyPets)
