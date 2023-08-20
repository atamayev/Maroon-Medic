import SingleSavedPreVetEducation from "./single-saved-pre-vet-education"

interface Props {
  preVetEducation: PreVetEducationItem[]
  deleteStatuses: DeleteStatusesDictionary
  setDeleteStatuses: React.Dispatch<React.SetStateAction<DeleteStatusesDictionary>>
  setPreVetEducation: React.Dispatch<React.SetStateAction<PreVetEducationItem[]>>
  setPreVetEducationConfirmation: (conf: ConfirmationMessage) => void
}

const SavedPreVetEducationList = (props: Props) => {
  const { preVetEducation, deleteStatuses, setDeleteStatuses, setPreVetEducation, setPreVetEducationConfirmation } = props

  return (
    <ul>
      {preVetEducation.map((_preVetEducation) => (
        <SingleSavedPreVetEducation
          key = {_preVetEducation.pre_vet_education_mappingID}
          preVetEducation = {preVetEducation}
          singlePreVetEducation = {_preVetEducation}
          deleteStatuses = {deleteStatuses}
          setDeleteStatuses = {setDeleteStatuses}
          setPreVetEducation = {setPreVetEducation}
          setPreVetEducationConfirmation = {setPreVetEducationConfirmation}
        />
      ))}
    </ul>
  )
}

export default SavedPreVetEducationList
