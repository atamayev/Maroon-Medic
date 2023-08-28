import SingleSavedPreVetEducation from "./single-saved-pre-vet-education"

interface Props {
  preVetEducation: PreVetEducationItem[]
  deleteStatuses: DeleteStatusesDictionary
  setDeleteStatuses: React.Dispatch<React.SetStateAction<DeleteStatusesDictionary>>
  handleDeleteOnClick: (PreVetEducation: PreVetEducationItem) => void
}

const SavedPreVetEducationList = (props: Props) => {
	const { preVetEducation, deleteStatuses, setDeleteStatuses, handleDeleteOnClick } = props

	return (
		<ul>
			{preVetEducation.map((singlePreVetEducation) => (
				<SingleSavedPreVetEducation
					key = {singlePreVetEducation.preVetEducationMappingId}
					singlePreVetEducation = {singlePreVetEducation}
					deleteStatuses = {deleteStatuses}
					setDeleteStatuses = {setDeleteStatuses}
					handleDeleteOnClick = {handleDeleteOnClick}
				/>
			))}
		</ul>
	)
}

export default SavedPreVetEducationList
