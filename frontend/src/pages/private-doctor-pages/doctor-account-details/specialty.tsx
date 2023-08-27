import _ from "lodash"
import { useState, useEffect, useMemo } from "react"
import SavedConfirmationMessage from "../../../components/saved-confirmation-message"
import useConfirmationMessage from "../../../custom-hooks/use-confirmation-message"
import useDeleteSpecialty from "src/custom-hooks/account-details/callbacks/use-delete-specialty"
import useAddSpecialty from "src/custom-hooks/account-details/callbacks/use-add-specialty"
import SelectOrganization from "src/components/doctor-account-details/specialty/select-organization"
import SelectSpecialty from "src/components/doctor-account-details/specialty/select-specialty"
import SavedSpecialtyList from "src/components/doctor-account-details/specialty/saved-specialty-list"
import AccountDetailsCard from "src/components/account-details-card"

interface Props {
  listDetails: DoctorListDetails
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
	const [selectedOrganization, setSelectedOrganization] = useState("")
	const [deleteStatuses, setDeleteStatuses] = useState<DeleteStatusesDictionary>({})
	const {listDetails, doctorSpecialties, setDoctorSpecialties} = props
	const [specialtiesConfirmation, setSpecialtiesConfirmation] = useConfirmationMessage()

	const specialties = selectedOrganization
		? listDetails.specialties.filter((item) => item.organizationName === selectedOrganization)
		: []

	useEffect(() => {
		const newDeleteStatuses = { ...deleteStatuses }

		// Go through each status
		for (const specialityListID in newDeleteStatuses) {
			// If the language ID does not exist in the spokenLanguages list, delete the status
			if (!doctorSpecialties.some((speciality) => speciality.specialties_listID === Number(specialityListID))) {
				delete newDeleteStatuses[specialityListID]
			}
		}

		setDeleteStatuses(newDeleteStatuses)
	}, [doctorSpecialties])

	const specificSpecialtiesOptions = useMemo(() => {
		return specialties
			.filter((specialty) =>
				!doctorSpecialties.find(
					(doctorSpecialty) =>
						doctorSpecialty.specialties_listID === specialty.specialties_listID
				)
			)
			.map((specialty) => (
				<option key = {specialty.specialties_listID} value = {specialty.specialties_listID}>
					{specialty.specialtyName}
				</option>
			))
	}, [specialties, doctorSpecialties])

	const handleSpecialtyChange = useAddSpecialty(
		doctorSpecialties,
		setDoctorSpecialties,
		setSelectedOrganization,
		listDetails,
		setSpecialtiesConfirmation
	)

	const handleDeleteSpecialty = useDeleteSpecialty(
		doctorSpecialties, setDoctorSpecialties,
		setSpecialtiesConfirmation, setSelectedOrganization
	)

	if (_.isEmpty(_.uniq(listDetails.specialties.map((item) => item.organizationName)))) return <p>Loading...</p>

	return (
		<>
			<SelectOrganization
				listDetails = {listDetails}
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
