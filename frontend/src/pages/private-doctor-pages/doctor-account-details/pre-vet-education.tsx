import _ from "lodash"
import { useState, useEffect } from "react"
import { Card, Button } from "react-bootstrap"
import { DeleteButtonOptions } from "../../../components/delete-buttons"
import { RenderMessageSection } from "../../../components/saved-message-section"
import { useConfirmationMessage } from "../../../custom-hooks/use-confirmation-message"
import { useHandleDeletePreVetEducation,
  useHandleAddPreVetEducation,
  useSaveAddPreVetEducation
} from "../../../custom-hooks/account-details-hooks/callbacks"
import EducationTime from "./education-time"

interface Props {
  listDetails: DoctorListDetails
  preVetEducation: PreVetEducationItem[]
  setPreVetEducation: React.Dispatch<React.SetStateAction<PreVetEducationItem[]>>
}

export default function RenderPreVetEducationSection(props: Props) {
  return (
    <Card className = "mb-3 mt-3">
      <Card.Header>
        Pre-vet education
      </Card.Header>
      <Card.Body>
        <RenderIsPreVetEducation {...props} />
      </Card.Body>
    </Card>
  )
}

function RenderIsPreVetEducation(props: Props) {
  const { listDetails, preVetEducation, setPreVetEducation } = props
  const [selectedPreVetSchool, setSelectedPreVetSchool] = useState<string>("")
  const [selectedMajor, setSelectedMajor] = useState<string>("")
  const [deleteStatuses, setDeleteStatuses] = useState<DeleteStatusesDictionary>({})
  const [selectedPreVetEducationType, setSelectedPreVetEducationType] = useState<string>("")
  const [timeState, setTimeState] = useState({
    startMonth: "",
    endMonth: "",
    startYear: "",
    endYear: "",
  })
  const [preVetEducationConfirmation, setPreVetEducationConfirmation] = useConfirmationMessage()

  const allChoicesFilled = selectedPreVetSchool && selectedMajor && selectedPreVetEducationType &&
    timeState.startMonth && timeState.endMonth && timeState.startYear && timeState.endYear

  useEffect(() => {
    const newDeleteStatuses = { ...deleteStatuses }

    // Go through each status
    for (const preVetEducationMappingID in newDeleteStatuses) {
      // If the language ID does not exist in the vetEducation list, delete the status
      if (!preVetEducation.some((_preVetEducation) => _preVetEducation.pre_vet_education_mappingID === Number(preVetEducationMappingID))) {
        delete newDeleteStatuses[preVetEducationMappingID]
      }
    }

    setDeleteStatuses(newDeleteStatuses)
  }, [preVetEducation])

  const RenderSelectSchool = () => {
    return (
      <div>
        <label htmlFor = "pre-vet-school">Select a school: </label>
        <select
          id = "pre-vet-school"
          name = "pre-vet-school"
          value = {selectedPreVetSchool}
          onChange = {(e) => setSelectedPreVetSchool(e.target.value)}
        >
          <option value = "" disabled>Choose a School</option>
          {_.uniqBy(listDetails.preVetSchools, "School_name").map(
            (school) => (
              <option key = {school.pre_vet_school_listID} value = {school.School_name}>
                {school.School_name}
              </option>
            )
          )}
        </select>
      </div>
    )
  }

  const RenderSelectMajor = () => {
    if (!selectedPreVetSchool) return null

    return (
      <>
        <label htmlFor = "major">Select a Major: </label>
        <select
          id = "major"
          name = "major"
          value = {selectedMajor}
          onChange = {(event) => setSelectedMajor(event.target.value)}
        >
          <option value = "" disabled>Choose a major</option>
          {_.uniqBy(listDetails.majors, "Major_name").map(
            (major) => (
              <option key = {major.major_listID} value = {major.Major_name}>
                {major.Major_name}
              </option>
            )
          )}
        </select>
      </>
    )
  }

  const RenderSelectEducationType = () => {
    if (!selectedMajor) return null

    return (
      <div>
        <label htmlFor = "education-type">Select a Type of Education: </label>
        <select
          id = "education-type"
          name = "education-type"
          value = {selectedPreVetEducationType}
          onChange = {(event) => setSelectedPreVetEducationType(event.target.value)}
        >
          <option value = "" disabled>Choose an Education Type</option>
          {_.uniqBy(listDetails.preVetEducationTypes, "Education_type").map(
            (preVetEdType) => (
              <option key = {preVetEdType.pre_vet_education_typeID} value = {preVetEdType.Education_type}>
                {preVetEdType.Education_type}
              </option>
            )
          )}
        </select>
      </div>
    )
  }

  const RenderEducationTime = () => {
    if (!selectedPreVetEducationType) return null

    return (
      <EducationTime
        timeState = {timeState}
        setTimeState = {setTimeState}
      />
    )
  }

  const handleAddEducation = useHandleAddPreVetEducation(
    selectedPreVetSchool, setSelectedPreVetSchool,
    selectedPreVetEducationType, setSelectedPreVetEducationType,
    timeState, setTimeState,
    selectedMajor, setSelectedMajor
  )

  const saveEducation = useSaveAddPreVetEducation(
    preVetEducation, setPreVetEducation,
    listDetails, setPreVetEducationConfirmation
  )

  const RenderAddAndSaveButton = () => {
    if (!allChoicesFilled) return null
    return (
      <Button
        onClick = {() => {
          const selectedEducationObj = handleAddEducation()
          saveEducation(selectedEducationObj as PreVetEducationItem)
        }}
      >
        Add
      </Button>
    )
  }

  const handleDeleteOnClick = useHandleDeletePreVetEducation(preVetEducation, setPreVetEducation, setPreVetEducationConfirmation)

  const RenderSingleSavedEducation = (singlePreVetEducation: PreVetEducationItem) => {
    const status: DeleteStatuses = deleteStatuses[singlePreVetEducation.pre_vet_education_mappingID] || "initial"

    const setStatus = (newStatus: DeleteStatuses) => {
      setDeleteStatuses((prevStatuses) => ({
        ...prevStatuses,
        [singlePreVetEducation.pre_vet_education_mappingID]: newStatus,
      }))
    }

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

  const RenderSavedEducationList = () => {
    return (
      <ul>
        {preVetEducation.map((_preVetEducation) => (
          <RenderSingleSavedEducation
            key = {_preVetEducation.pre_vet_education_mappingID}
            {..._preVetEducation}
          />
        ))}
      </ul>
    )
  }

  if (_.isEmpty(_.uniq(listDetails.preVetSchools.map((item) => item.School_name)))) return <p> Loading... </p>

  return (
    <>
      <RenderSelectSchool />

      <RenderSelectMajor />

      <RenderSelectEducationType />

      <RenderEducationTime />

      <RenderAddAndSaveButton />

      <RenderSavedEducationList />
      <RenderMessageSection
        confirmationMessage = {preVetEducationConfirmation}
        whatIsBeingSaved = "Pre-Vet Education"
      />
    </>
  )
}
