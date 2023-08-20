import _ from "lodash"
import { useState, useEffect } from "react"
import { Card } from "react-bootstrap"
import SavedConfirmationMessage from "../../../components/saved-confirmation-message"
import useConfirmationMessage from "../../../custom-hooks/use-confirmation-message"
import {
  useSaveAddVetEducation,
  useHandleAddVetEducation
} from "../../../custom-hooks/account-details-hooks/callbacks"
import SelectVetSchool from "src/components/doctor-account-details/education/vet-education/select-vet-school"
import SelectVetEducationType from "src/components/doctor-account-details/education/vet-education/select-vet-education-type"
import VetEducationTime from "src/components/doctor-account-details/education/vet-education/vet-education-time"
import AddAndSaveVetEducationButton from "src/components/doctor-account-details/education/vet-education/add-and-save-vet-education-button"
import SavedVetEducationList from "src/components/doctor-account-details/education/vet-education/saved-vet-education-list"

interface Props {
  listDetails: DoctorListDetails
  vetEducation: VetEducationItem[]
  setVetEducation: React.Dispatch<React.SetStateAction<VetEducationItem[]>>
}

export default function RenderVetEducationSection (props: Props) {
  return (
    <Card className = "mb-3">
      <Card.Header>
        Vet Education
      </Card.Header>
      <Card.Body>
        <RenderIsVetEducation {...props} />
      </Card.Body>
    </Card>
  )
}

function RenderIsVetEducation(props: Props) {
  const { listDetails, vetEducation, setVetEducation } = props
  const [selectedVetSchool, setSelectedVetSchool] = useState("")
  const [deleteStatuses, setDeleteStatuses] = useState<DeleteStatusesDictionary>({})
  const [selectedVetEducationType, setSelectedVetEducationType] = useState("")
  const [timeState, setTimeState] = useState({
    startMonth: "",
    endMonth: "",
    startYear: "",
    endYear: "",
  })
  const [vetEducationConfirmation, setVetEducationConfirmation] = useConfirmationMessage()

  const allChoicesFilled = Boolean(selectedVetSchool && selectedVetEducationType &&
    timeState.startMonth && timeState.endMonth && timeState.startYear && timeState.endYear)

  useEffect(() => {
    const newDeleteStatuses = { ...deleteStatuses }

    // Go through each status
    for (const vetEducationMappingID in newDeleteStatuses) {
      // If the language ID does not exist in the vetEducation list, delete the status
      if (!vetEducation.some((VetEducation) => VetEducation.vet_education_mappingID === Number(vetEducationMappingID))) {
        delete newDeleteStatuses[vetEducationMappingID]
      }
    }

    setDeleteStatuses(newDeleteStatuses)
  }, [vetEducation])

  const handleAddEducation = useHandleAddVetEducation(
    selectedVetSchool, setSelectedVetSchool,
    selectedVetEducationType, setSelectedVetEducationType,
    timeState,setTimeState
  )

  const saveVetEducation = useSaveAddVetEducation(
    vetEducation, setVetEducation,
    listDetails, setVetEducationConfirmation
  )

  if (_.isEmpty(_.uniq(listDetails.vetSchools.map((item) => item.School_name)))) return <p>Loading...</p>

  return (
    <>
      <SelectVetSchool
        listDetails = {listDetails}
        selectedVetSchool = {selectedVetSchool}
        setSelectedVetSchool = {setSelectedVetSchool}
      />

      <SelectVetEducationType
        listDetails = {listDetails}
        selectedVetEducationType = {selectedVetEducationType}
        selectedVetSchool = {selectedVetSchool}
        setSelectedVetEducationType = {setSelectedVetEducationType}
      />

      <VetEducationTime
        timeState = {timeState}
        setTimeState = {setTimeState}
        selectedVetEducationType = {selectedVetEducationType}
      />

      <AddAndSaveVetEducationButton
        allChoicesFilled = {allChoicesFilled}
        handleAddEducation = {handleAddEducation}
        saveVetEducation = {saveVetEducation}
      />

      <SavedVetEducationList
        vetEducation = {vetEducation}
        deleteStatuses = {deleteStatuses}
        setDeleteStatuses = {setDeleteStatuses}
        setVetEducation = {setVetEducation}
        setVetEducationConfirmation = {setVetEducationConfirmation}
      />

      <SavedConfirmationMessage
        confirmationMessage = {vetEducationConfirmation}
        whatIsBeingSaved = "Vet Education"
      />
    </>
  )
}
