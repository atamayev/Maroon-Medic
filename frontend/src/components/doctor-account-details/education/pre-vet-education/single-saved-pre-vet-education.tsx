import DeleteButtonOptions from "src/components/delete-buttons/delete-button-options"

interface Props {
  singlePreVetEducation: PreVetEducationItem
  deleteStatuses: DeleteStatusesDictionary
  setDeleteStatuses: React.Dispatch<React.SetStateAction<DeleteStatusesDictionary>>
  handleDeleteOnClick: (PreVetEducation: PreVetEducationItem) => void
}

const SingleSavedPreVetEducation = (props: Props) => {
	const { singlePreVetEducation, deleteStatuses, setDeleteStatuses, handleDeleteOnClick } = props

	const status: DeleteStatuses = deleteStatuses[singlePreVetEducation.pre_vet_education_mappingID] || "initial"

	const setStatus = (newStatus: DeleteStatuses) => {
		setDeleteStatuses((prevStatuses) => ({
			...prevStatuses,
			[singlePreVetEducation.pre_vet_education_mappingID]: newStatus,
		}))
	}

	return (
		<li>
			{singlePreVetEducation.schoolName}, {singlePreVetEducation.educationType} in {singlePreVetEducation.majorName}
			{" ("}{singlePreVetEducation.Start_Date} - {singlePreVetEducation.End_Date}{") "}
			<DeleteButtonOptions<PreVetEducationItem>
				status = {status}
				setStatus = {setStatus}
				dataType = {singlePreVetEducation}
				handleDeleteOnClick = {handleDeleteOnClick}
			/>
		</li>
	)
}

export default SingleSavedPreVetEducation
