import _ from "lodash"
import { observer } from "mobx-react"
import { useState, useEffect, useContext } from "react"
import SavedConfirmationMessage from "../../../components/saved-confirmation-message"
import useConfirmationMessage from "../../../custom-hooks/use-confirmation-message"
import useDeleteSpecialty from "src/custom-hooks/account-details/callbacks/use-delete-specialty"
import useAddSpecialty from "src/custom-hooks/account-details/callbacks/use-add-specialty"
import SelectOrganization from "src/components/doctor-account-details/specialty/select-organization"
import SelectSpecialty from "src/components/doctor-account-details/specialty/select-specialty"
import SavedSpecialtyList from "src/components/doctor-account-details/specialty/saved-specialty-list"
import AccountDetailsCard from "src/components/account-details-card"
import { AppContext } from "src/contexts/maroon-context"

export default function SpecialtySection () {
	return (
		<AccountDetailsCard
			title = "Specialties"
			content = {<VetSpecialties />}
		/>
	)
}

function VetSpecialties() {
	const { doctorAccountDetails } = useContext(AppContext)
	const [selectedOrganization, setSelectedOrganization] = useState("")
	const [deleteStatuses, setDeleteStatuses] = useState<DeleteStatusesDictionary>({})
	const [specialtiesConfirmation, setSpecialtiesConfirmation] = useConfirmationMessage()

	useEffect(() => {
		if (_.isNull(doctorAccountDetails) || _.isEmpty(doctorAccountDetails.specialties)) return
		const newDeleteStatuses = { ...deleteStatuses }

		// Go through each status
		for (const specialityListId in newDeleteStatuses) {
			// If the language Id does not exist in the spokenLanguages list, delete the status
			if (!doctorAccountDetails.specialties.some((speciality) => speciality.specialtiesListId === Number(specialityListId))) {
				delete newDeleteStatuses[specialityListId]
			}
		}

		setDeleteStatuses(newDeleteStatuses)
	}, [doctorAccountDetails?.specialties])

	const handleSpecialtyChange = useAddSpecialty(
		doctorAccountDetails?.specialties || [],
		setSelectedOrganization,
		setSpecialtiesConfirmation
	)

	const handleDeleteSpecialty = useDeleteSpecialty(
		doctorAccountDetails?.specialties || [],
		setSpecialtiesConfirmation,
		setSelectedOrganization
	)

	return (
		<>
			<SelectOrganization
				selectedOrganization = {selectedOrganization}
				setSelectedOrganization = {setSelectedOrganization}
			/>

			<SelectSpecialty
				selectedOrganization = {selectedOrganization}
				handleSpecialtyChange = {handleSpecialtyChange}
			/>

			<SavedSpecialtyList
				deleteStatuses = {deleteStatuses}
				setDeleteStatuses = {setDeleteStatuses}
				handleDeleteSpecialty = {handleDeleteSpecialty}
			/>

			<SavedConfirmationMessage
				confirmationMessage = {specialtiesConfirmation}
				whatIsBeingSaved = "Specialties"
			/>
		</>
	)
}

observer(SpecialtySection)
