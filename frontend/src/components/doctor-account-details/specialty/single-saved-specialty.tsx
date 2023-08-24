import DeleteButtonOptions from "src/components/delete-buttons/delete-button-options"

interface Props {
  deleteStatuses: DeleteStatusesDictionary
  setDeleteStatuses: React.Dispatch<React.SetStateAction<DeleteStatusesDictionary>>
  specialty: SpecialtyItem
  handleDeleteSpecialty: (specialty: SpecialtyItem) => void
}

const SingleSavedSpecialty = (props: Props) => {
	const { deleteStatuses, setDeleteStatuses, specialty, handleDeleteSpecialty } = props

	const status = deleteStatuses[specialty.specialties_listID] || "initial"

	const setStatus = (newStatus: DeleteStatuses) => {
		setDeleteStatuses((prevStatuses) => ({
			...prevStatuses,
			[specialty.specialties_listID]: newStatus,
		}))
	}

	return (
		<li>
			{specialty.Organization_name} - {specialty.Specialty_name}{" "}
			<DeleteButtonOptions<SpecialtyItem>
				status = {status}
				setStatus = {setStatus}
				dataType = {specialty}
				handleDeleteOnClick = {handleDeleteSpecialty}
			/>
		</li>
	)
}

export default SingleSavedSpecialty
