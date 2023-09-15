import { observer } from "mobx-react"
import { useState, useEffect, useContext } from "react"
import SavedConfirmationMessage from "../../../components/saved-confirmation-message"
import useConfirmationMessage from "../../../custom-hooks/use-confirmation-message"
import useDeletePreVetEducation from "src/custom-hooks/account-details/callbacks/use-delete-pre-vet-education"
import useAddPreVetEducation from "src/custom-hooks/account-details/callbacks/use-add-pre-vet-education"
import useSaveAddPreVetEducation from "src/custom-hooks/account-details/callbacks/use-save-add-pre-vet-education"
import SelectPreVetSchool from "src/components/doctor-account-details/education/pre-vet-education/select-pre-vet-school"
import SelectMajor from "src/components/doctor-account-details/education/pre-vet-education/select-major"
import SelectPreVetEducationType from "src/components/doctor-account-details/education/pre-vet-education/select-pre-vet-education-type"
import SavedPreVetEducationList from "src/components/doctor-account-details/education/pre-vet-education/saved-pre-vet-education-list"
import PreVetEducationTime from "src/components/doctor-account-details/education/pre-vet-education/pre-vet-education-time"
import AddAndSavePreVetEducationButton
	from "src/components/doctor-account-details/education/pre-vet-education/add-and-save-pre-vet-education-button"
import AccountDetailsCard from "src/components/account-details-card"
import { AppContext } from "src/contexts/maroon-context"

export default function PreVetEducationSection() {
	return (
		<AccountDetailsCard
			title = "Pre-vet education"
			content = {<PreVetEducation />}
		/>
	)
}

// eslint-disable-next-line complexity
function PreVetEducation() {
	const appContext = useContext(AppContext)
	const [selectedPreVetSchool, setSelectedPreVetSchool] = useState<string>("")
	const [selectedMajor, setSelectedMajor] = useState<string>("")
	const [deleteStatuses, setDeleteStatuses] = useState<DeleteStatusesDictionary>({})
	const [selectedPreVetEducationType, setSelectedPreVetEducationType] = useState<string>("")
	const [timeState, setTimeState] = useState({
		startMonth: "",
		endMonth: "",
		startYear: "",
		endYear: "",
	})
	const [preVetEducationConfirmation, setPreVetEducationConfirmation] = useConfirmationMessage()

	const allChoicesFilled = Boolean(selectedPreVetSchool && selectedMajor && selectedPreVetEducationType &&
    timeState.startMonth && timeState.endMonth && timeState.startYear && timeState.endYear)

	useEffect(() => {
		const newDeleteStatuses = { ...deleteStatuses }

		for (const preVetEducationMappingId in newDeleteStatuses) {
			// If the language Id does not exist in the vetEducation list, delete the status
			if (!appContext.doctorAccountDetails?.preVetEducation.some(
				(preVetEducationItem) => preVetEducationItem.preVetEducationMappingId === Number(preVetEducationMappingId)
			)) {
				delete newDeleteStatuses[preVetEducationMappingId]
			}
		}

		setDeleteStatuses(newDeleteStatuses)
	}, [appContext.doctorAccountDetails?.preVetEducation])

	const handleAddEducation = useAddPreVetEducation(
		selectedPreVetSchool, setSelectedPreVetSchool,
		selectedPreVetEducationType, setSelectedPreVetEducationType,
		timeState, setTimeState,
		selectedMajor, setSelectedMajor
	)

	const savePreVetEducation = useSaveAddPreVetEducation(setPreVetEducationConfirmation)

	const handleDeleteOnClick = useDeletePreVetEducation(setPreVetEducationConfirmation)

	return (
		<>
			<SelectPreVetSchool
				selectedPreVetSchool = {selectedPreVetSchool}
				setSelectedPreVetSchool = {setSelectedPreVetSchool}
			/>

			<SelectMajor
				selectedPreVetSchool = {selectedPreVetSchool}
				selectedMajor = {selectedMajor}
				setSelectedMajor = {setSelectedMajor}
			/>

			<SelectPreVetEducationType
				selectedPreVetEducationType = {selectedPreVetEducationType}
				selectedMajor = {selectedMajor}
				setSelectedPreVetEducationType = {setSelectedPreVetEducationType}
			/>

			<PreVetEducationTime
				selectedPreVetEducationType = {selectedPreVetEducationType}
				timeState = {timeState}
				setTimeState = {setTimeState}
			/>

			<AddAndSavePreVetEducationButton
				handleAddEducation = {handleAddEducation}
				saveEducation = {savePreVetEducation}
				allChoicesFilled = {allChoicesFilled}
			/>

			<SavedPreVetEducationList
				deleteStatuses = {deleteStatuses}
				setDeleteStatuses = {setDeleteStatuses}
				handleDeleteOnClick = {handleDeleteOnClick}
			/>

			<SavedConfirmationMessage
				confirmationMessage = {preVetEducationConfirmation}
				whatIsBeingSaved = "Pre-Vet Education"
			/>
		</>
	)
}

observer(PreVetEducation)
