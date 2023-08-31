import SingleSavedSpecialty from "./single-saved-specialty"

interface Props {
  doctorSpecialties: SpecialtyItem[]
  deleteStatuses: DeleteStatusesDictionary
  setDeleteStatuses: React.Dispatch<React.SetStateAction<DeleteStatusesDictionary>>
  handleDeleteSpecialty: (specialty: SpecialtyItem) => void
}

export default function SavedSpecialtyList (props: Props) {
	const { doctorSpecialties, deleteStatuses, setDeleteStatuses, handleDeleteSpecialty } = props

	return (
		<ul>
			{doctorSpecialties.map((specialty) => (
				<SingleSavedSpecialty
					key = {specialty.specialtiesListId}
					deleteStatuses = {deleteStatuses}
					setDeleteStatuses = {setDeleteStatuses}
					specialty = {specialty}
					handleDeleteSpecialty = {handleDeleteSpecialty}
				/>
			))}
		</ul>
	)
}
