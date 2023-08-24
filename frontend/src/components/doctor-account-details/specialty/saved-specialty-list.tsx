import SingleSavedSpecialty from "./single-saved-specialty"

interface Props {
  doctorSpecialties: SpecialtyItem[]
  deleteStatuses: DeleteStatusesDictionary
  setDeleteStatuses: React.Dispatch<React.SetStateAction<DeleteStatusesDictionary>>
  handleDeleteSpecialty: (specialty: SpecialtyItem) => void
}

const SavedSpecialtyList = (props: Props) => {
	const { doctorSpecialties, deleteStatuses, setDeleteStatuses, handleDeleteSpecialty } = props

	return (
		<ul>
			{doctorSpecialties.map((specialty) => (
				<SingleSavedSpecialty
					key = {specialty.specialties_listID}
					deleteStatuses = {deleteStatuses}
					setDeleteStatuses = {setDeleteStatuses}
					specialty = {specialty}
					handleDeleteSpecialty = {handleDeleteSpecialty}
				/>
			))}
		</ul>
	)
}

export default SavedSpecialtyList
