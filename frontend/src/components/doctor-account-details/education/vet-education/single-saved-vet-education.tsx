import DeleteButtonOptions from "src/components/delete-buttons/delete-button-options"

interface Props {
  singleVetEducation: VetEducationItem
  deleteStatuses: DeleteStatusesDictionary
  setDeleteStatuses: React.Dispatch<React.SetStateAction<DeleteStatusesDictionary>>
  handleDeleteOnClick: (VetEducation: VetEducationItem) => void
}

const SingleSavedVetEducation = (props: Props) => {
	const { singleVetEducation, deleteStatuses, setDeleteStatuses, handleDeleteOnClick } = props

	const status = deleteStatuses[singleVetEducation.vetEducationMappingId] || "initial"

	const setStatus = (newStatus: DeleteStatuses) => {
		setDeleteStatuses((prevStatuses) => ({
			...prevStatuses,
			[singleVetEducation.vetEducationMappingId]: newStatus,
		}))
	}

	return (
		<li>
			{singleVetEducation.schoolName}, {singleVetEducation.educationType}
			{" (" + singleVetEducation.startDate} - {singleVetEducation.endDate + ") "}
			<DeleteButtonOptions<VetEducationItem>
				status = {status}
				setStatus = {setStatus}
				dataType = {singleVetEducation}
				handleDeleteOnClick = {handleDeleteOnClick}
			/>
		</li>
	)
}

export default SingleSavedVetEducation
