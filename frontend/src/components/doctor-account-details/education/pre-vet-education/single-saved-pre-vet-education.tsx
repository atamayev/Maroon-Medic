import DeleteButtonOptions from "src/components/delete-buttons/delete-button-options"

interface Props {
  singlePreVetEducation: PreVetEducationItem
  deleteStatuses: DeleteStatusesDictionary
  setDeleteStatuses: React.Dispatch<React.SetStateAction<DeleteStatusesDictionary>>
  handleDeleteOnClick: (PreVetEducation: PreVetEducationItem) => void
}

const SingleSavedPreVetEducation = (props: Props) => {
	const { singlePreVetEducation, deleteStatuses, setDeleteStatuses, handleDeleteOnClick } = props

	const status: DeleteStatuses = deleteStatuses[singlePreVetEducation.preVetEducationMappingId] || "initial"

	const setStatus = (newStatus: DeleteStatuses) => {
		setDeleteStatuses((prevStatuses) => ({
			...prevStatuses,
			[singlePreVetEducation.preVetEducationMappingId]: newStatus,
		}))
	}

	return (
		<li>
			{singlePreVetEducation.schoolName}, {singlePreVetEducation.educationType} in {singlePreVetEducation.majorName}
			{" ("}{singlePreVetEducation.startDate} - {singlePreVetEducation.endDate}{") "}
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
