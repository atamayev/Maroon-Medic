import DeleteButtonOptions from "src/components/delete-buttons/delete-button-options"

interface Props {
  singleVetEducation: VetEducationItem
  deleteStatuses: DeleteStatusesDictionary
  setDeleteStatuses: React.Dispatch<React.SetStateAction<DeleteStatusesDictionary>>
  handleDeleteOnClick: (VetEducation: VetEducationItem) => void
}

const SingleSavedVetEducation = (props: Props) => {
	const { singleVetEducation, deleteStatuses, setDeleteStatuses, handleDeleteOnClick } = props

	const status = deleteStatuses[singleVetEducation.vet_education_mappingID] || "initial"

	const setStatus = (newStatus: DeleteStatuses) => {
		setDeleteStatuses((prevStatuses) => ({
			...prevStatuses,
			[singleVetEducation.vet_education_mappingID]: newStatus,
		}))
	}

	return (
		<li>
			{singleVetEducation.schoolName}, {singleVetEducation.educationType}
			{" (" + singleVetEducation.Start_Date} - {singleVetEducation.End_Date + ") "}
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
