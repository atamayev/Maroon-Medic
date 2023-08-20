import SingleSavedVetEducation from "./single-saved-vet-education"

interface Props {
  vetEducation: VetEducationItem[]
  deleteStatuses: DeleteStatusesDictionary
  setDeleteStatuses: React.Dispatch<React.SetStateAction<DeleteStatusesDictionary>>
  setVetEducation: React.Dispatch<React.SetStateAction<VetEducationItem[]>>
  setVetEducationConfirmation: (conf: ConfirmationMessage) => void
}

const SavedVetEducationList = (props: Props) => {
  const { vetEducation, deleteStatuses, setDeleteStatuses, setVetEducation, setVetEducationConfirmation } = props

  return (
    <ul>
      {vetEducation.map((VetEducation) => (
        <SingleSavedVetEducation
          key = {VetEducation.vet_education_mappingID}
          vetEducation = {vetEducation}
          singleVetEducation = {VetEducation}
          deleteStatuses = {deleteStatuses}
          setDeleteStatuses = {setDeleteStatuses}
          setVetEducation = {setVetEducation}
          setVetEducationConfirmation = {setVetEducationConfirmation}
        />
      ))}
    </ul>
  )
}

export default SavedVetEducationList
