import DeleteButtonOptions from "src/components/delete-buttons/delete-button-options"
import { useHandleDeleteVetEducation } from "src/custom-hooks/account-details-hooks/callbacks"


interface Props {
  vetEducation: VetEducationItem[]
  singleVetEducation: VetEducationItem
  deleteStatuses: DeleteStatusesDictionary
  setDeleteStatuses: React.Dispatch<React.SetStateAction<DeleteStatusesDictionary>>
  setVetEducation: React.Dispatch<React.SetStateAction<VetEducationItem[]>>
  setVetEducationConfirmation: (conf: ConfirmationMessage) => void
}

const SingleSavedVetEducation = (props: Props) => {
  const { vetEducation, singleVetEducation,
    deleteStatuses, setDeleteStatuses, setVetEducation, setVetEducationConfirmation } = props

  const status = deleteStatuses[singleVetEducation.vet_education_mappingID] || "initial"

  const setStatus = (newStatus: DeleteStatuses) => {
    setDeleteStatuses((prevStatuses) => ({
      ...prevStatuses,
      [singleVetEducation.vet_education_mappingID]: newStatus,
    }))
  }

  const handleDeleteOnClick = useHandleDeleteVetEducation(vetEducation, setVetEducation, setVetEducationConfirmation)

  return (
    <li>
      {singleVetEducation.School_name}, {singleVetEducation.Education_type}
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
