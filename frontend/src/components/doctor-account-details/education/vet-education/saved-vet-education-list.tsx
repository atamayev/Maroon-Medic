import SingleSavedVetEducation from "./single-saved-vet-education"

interface Props {
	vetEducation: VetEducationItem[]
	deleteStatuses: DeleteStatusesDictionary
	setDeleteStatuses: React.Dispatch<React.SetStateAction<DeleteStatusesDictionary>>
	handleDeleteOnClick: (VetEducation: VetEducationItem) => void
}

export default function SavedVetEducationList (props: Props) {
	const { vetEducation, deleteStatuses, setDeleteStatuses, handleDeleteOnClick } = props

	return (
		<ul>
			{vetEducation.map((singleVetEducation) => (
				<SingleSavedVetEducation
					key = {singleVetEducation.vetEducationMappingId}
					singleVetEducation = {singleVetEducation}
					deleteStatuses = {deleteStatuses}
					setDeleteStatuses = {setDeleteStatuses}
					handleDeleteOnClick = {handleDeleteOnClick}
				/>
			))}
		</ul>
	)
}
