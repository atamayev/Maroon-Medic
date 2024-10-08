import { observer } from "mobx-react"
import { useState, useEffect, useContext } from "react"
import SavedConfirmationMessage from "../../../components/saved-confirmation-message"
import useConfirmationMessage from "../../../custom-hooks/use-confirmation-message"
import useDeleteVetEducation from "src/custom-hooks/account-details/callbacks/use-delete-vet-education"
import useAddVetEducation from "src/custom-hooks/account-details/callbacks/use-add-vet-education"
import useSaveAddVetEducation from "../../../custom-hooks/account-details/callbacks/use-save-add-vet-education"
import SelectVetSchool from "src/components/doctor-account-details/education/vet-education/select-vet-school"
import SelectVetEducationType from "src/components/doctor-account-details/education/vet-education/select-vet-education-type"
import VetEducationTime from "src/components/doctor-account-details/education/vet-education/vet-education-time"
import AddAndSaveVetEducationButton from "src/components/doctor-account-details/education/vet-education/add-and-save-vet-education-button"
import SavedVetEducationList from "src/components/doctor-account-details/education/vet-education/saved-vet-education-list"
import AccountDetailsCard from "src/components/account-details-card"
import AppContext from "src/contexts/maroon-context"

export default function VetEducationSection () {
	return (
		<AccountDetailsCard
			title = "Vet Education"
			content = {<VetEducation />}
		/>
	)
}

function VetEducation() {
	const doctorAccountDetails = useContext(AppContext).privateDoctorData?.doctorAccountDetails
	const [selectedVetSchool, setSelectedVetSchool] = useState("")
	const [deleteStatuses, setDeleteStatuses] = useState<DeleteStatusesDictionary>({})
	const [selectedVetEducationType, setSelectedVetEducationType] = useState("")
	const [timeState, setTimeState] = useState({
		startMonth: "",
		endMonth: "",
		startYear: "",
		endYear: ""
	})
	const [vetEducationConfirmation, setVetEducationConfirmation] = useConfirmationMessage()

	const allChoicesFilled = Boolean(selectedVetSchool && selectedVetEducationType &&
		timeState.startMonth && timeState.endMonth && timeState.startYear && timeState.endYear)

	useEffect(() => {
		const newDeleteStatuses = { ...deleteStatuses }

		// Go through each status
		for (const vetEducationMappingId in newDeleteStatuses) {
			// If the language Id does not exist in the vetEducation list, delete the status
			if (!doctorAccountDetails?.vetEducation.some(
				(vetEducationItem) => vetEducationItem.vetEducationMappingId === Number(vetEducationMappingId)
			)) {
				delete newDeleteStatuses[vetEducationMappingId]
			}
		}

		setDeleteStatuses(newDeleteStatuses)
	}, [doctorAccountDetails?.vetEducation])

	const handleAddEducation = useAddVetEducation(
		selectedVetSchool, setSelectedVetSchool,
		selectedVetEducationType, setSelectedVetEducationType,
		timeState, setTimeState
	)

	const saveVetEducation = useSaveAddVetEducation(setVetEducationConfirmation)

	const handleDeleteOnClick = useDeleteVetEducation(setVetEducationConfirmation)

	return (
		<>
			<SelectVetSchool
				selectedVetSchool = {selectedVetSchool}
				setSelectedVetSchool = {setSelectedVetSchool}
			/>

			<SelectVetEducationType
				selectedVetEducationType = {selectedVetEducationType}
				selectedVetSchool = {selectedVetSchool}
				setSelectedVetEducationType = {setSelectedVetEducationType}
			/>

			<VetEducationTime
				timeState = {timeState}
				setTimeState = {setTimeState}
				selectedVetEducationType = {selectedVetEducationType}
			/>

			<AddAndSaveVetEducationButton
				allChoicesFilled = {allChoicesFilled}
				handleAddEducation = {handleAddEducation}
				saveVetEducation = {saveVetEducation}
			/>

			<SavedVetEducationList
				deleteStatuses = {deleteStatuses}
				setDeleteStatuses = {setDeleteStatuses}
				handleDeleteOnClick = {handleDeleteOnClick}
			/>

			<SavedConfirmationMessage
				confirmationMessage = {vetEducationConfirmation}
				whatIsBeingSaved = "Vet Education"
			/>
		</>
	)
}

observer(VetEducation)
