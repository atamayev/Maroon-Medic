import _ from "lodash"
import { observer } from "mobx-react"
import { useState, useEffect, useMemo, useContext } from "react"
import SavedConfirmationMessage from "../../../components/saved-confirmation-message"
import useConfirmationMessage from "../../../custom-hooks/use-confirmation-message"
import useDeleteSpecialty from "src/custom-hooks/account-details/callbacks/use-delete-specialty"
import useAddSpecialty from "src/custom-hooks/account-details/callbacks/use-add-specialty"
import SelectOrganization from "src/components/doctor-account-details/specialty/select-organization"
import SelectSpecialty from "src/components/doctor-account-details/specialty/select-specialty"
import SavedSpecialtyList from "src/components/doctor-account-details/specialty/saved-specialty-list"
import AccountDetailsCard from "src/components/account-details-card"
import { AppContext } from "src/contexts/maroon-context"

interface Props {
	doctorSpecialties: SpecialtyItem[]
	setDoctorSpecialties: React.Dispatch<React.SetStateAction<SpecialtyItem[]>>
}

export default function SpecialtySection (props: Props) {
	return (
		<AccountDetailsCard
			title = "Specialties"
			content = {<VetSpecialties {...props}/>}
		/>
	)
}

function VetSpecialties(props: Props) {
	const { doctorSpecialties, setDoctorSpecialties } = props
	const { doctorLists } = useContext(AppContext)
	const [selectedOrganization, setSelectedOrganization] = useState("")
	const [deleteStatuses, setDeleteStatuses] = useState<DeleteStatusesDictionary>({})
	const [specialtiesConfirmation, setSpecialtiesConfirmation] = useConfirmationMessage()

	if (
		_.isNull(doctorLists) ||
		_.isEmpty(_.uniq(doctorLists.specialties.map((item) => item.organizationName)))
	) return <p>Loading...</p>

	const specialties = selectedOrganization
		? doctorLists.specialties.filter((item) => item.organizationName === selectedOrganization)
		: []

	useEffect(() => {
		const newDeleteStatuses = { ...deleteStatuses }

		// Go through each status
		for (const specialityListId in newDeleteStatuses) {
			// If the language Id does not exist in the spokenLanguages list, delete the status
			if (!doctorSpecialties.some((speciality) => speciality.specialtiesListId === Number(specialityListId))) {
				delete newDeleteStatuses[specialityListId]
			}
		}

		setDeleteStatuses(newDeleteStatuses)
	}, [doctorSpecialties])

	const specificSpecialtiesOptions = useMemo(() => {
		return specialties
			.filter((specialty) =>
				!doctorSpecialties.find(
					(doctorSpecialty) =>
						doctorSpecialty.specialtiesListId === specialty.specialtiesListId
				)
			)
			.map((specialty) => (
				<option key = {specialty.specialtiesListId} value = {specialty.specialtiesListId}>
					{specialty.specialtyName}
				</option>
			))
	}, [specialties, doctorSpecialties])

	const handleSpecialtyChange = useAddSpecialty(
		doctorSpecialties,
		setDoctorSpecialties,
		setSelectedOrganization,
		setSpecialtiesConfirmation
	)

	const handleDeleteSpecialty = useDeleteSpecialty(
		doctorSpecialties, setDoctorSpecialties,
		setSpecialtiesConfirmation, setSelectedOrganization
	)


	return (
		<>
			<SelectOrganization
				selectedOrganization = {selectedOrganization}
				setSelectedOrganization = {setSelectedOrganization}
			/>

			<SelectSpecialty
				selectedOrganization = {selectedOrganization}
				specificSpecialtiesOptions = {specificSpecialtiesOptions}
				handleSpecialtyChange = {handleSpecialtyChange}
			/>

			<SavedSpecialtyList
				doctorSpecialties = {doctorSpecialties}
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
