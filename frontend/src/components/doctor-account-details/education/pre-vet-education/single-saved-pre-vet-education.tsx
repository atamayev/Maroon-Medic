import DeleteButtonOptions from "src/components/delete-buttons/delete-button-options"
import { useHandleDeletePreVetEducation } from "src/custom-hooks/account-details-hooks/callbacks"

interface Props {
  preVetEducation: PreVetEducationItem[]
  singlePreVetEducation: PreVetEducationItem
  deleteStatuses: DeleteStatusesDictionary
  setDeleteStatuses: React.Dispatch<React.SetStateAction<DeleteStatusesDictionary>>
  setPreVetEducation: React.Dispatch<React.SetStateAction<PreVetEducationItem[]>>
  setPreVetEducationConfirmation: (conf: ConfirmationMessage) => void
}

const SingleSavedPreVetEducation = (props: Props) => {
  const { preVetEducation, singlePreVetEducation,
    deleteStatuses, setDeleteStatuses, setPreVetEducation, setPreVetEducationConfirmation } = props

  const status: DeleteStatuses = deleteStatuses[singlePreVetEducation.pre_vet_education_mappingID] || "initial"

  const setStatus = (newStatus: DeleteStatuses) => {
    setDeleteStatuses((prevStatuses) => ({
      ...prevStatuses,
      [singlePreVetEducation.pre_vet_education_mappingID]: newStatus,
    }))
  }

  const handleDeleteOnClick = useHandleDeletePreVetEducation(preVetEducation, setPreVetEducation, setPreVetEducationConfirmation)

  return (
    <li>
      {singlePreVetEducation.School_name}, {singlePreVetEducation.Education_type} in {singlePreVetEducation.Major_name}
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
