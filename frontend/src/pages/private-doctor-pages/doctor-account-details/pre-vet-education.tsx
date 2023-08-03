import _ from "lodash"
import { useState, useEffect } from "react"
import { Card, Button } from "react-bootstrap"
import { DeleteButtonOptions } from "../../../components/delete-buttons"
import { RenderMessageSection } from "../../../components/saved-message-section"
import { useConfirmationMessage } from "../../../custom-hooks/use-confirmation-message"
import { useHandleDeletePreVetEducation } from "../../../custom-hooks/account-details-hooks/callbacks"
import { useHandleAddPreVetEducation, useSaveAddPreVetEducation } from "../../../custom-hooks/account-details-hooks/callbacks"
import EducationTime from "./education-time"

interface Props {
  listDetails: DoctorListDetailsType
  preVetEducation: PreVetEducationItemType[]
  setPreVetEducation: React.Dispatch<React.SetStateAction<PreVetEducationItemType[]>>
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
      if (!preVetEducation.some((preVetEducation) => preVetEducation.pre_vet_education_mappingID === Number(preVetEducationMappingID))) {
        delete newDeleteStatuses[preVetEducationMappingID]
      }
    }

    setDeleteStatuses(newDeleteStatuses)
  }, [preVetEducation])

  const renderSelectSchool = () => {
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

  const renderSelectMajor = () => {
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

  const renderSelectEducationType = () => {
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

  const renderEducationTime = () => {
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

  const renderAddAndSaveButton = () => {
    if (!allChoicesFilled) return null
    return (
      <Button
        onClick = {() => {
          const selectedEducationObj = handleAddEducation()
          saveEducation(selectedEducationObj as PreVetEducationItemType)
        }}
      >
        Add
      </Button>
    )
  }

  const handleDeleteOnClick = useHandleDeletePreVetEducation(preVetEducation, setPreVetEducation, setPreVetEducationConfirmation)

  const RenderSingleSavedEducation = (preVetEducation: PreVetEducationItemType) => {
    const status: DeleteStatusesType = deleteStatuses[preVetEducation.pre_vet_education_mappingID] || "initial"

    const setStatus = (newStatus: DeleteStatusesType) => {
      setDeleteStatuses((prevStatuses) => ({
        ...prevStatuses,
        [preVetEducation.pre_vet_education_mappingID]: newStatus,
      }))
    }

    return (
      <li>
        {preVetEducation.School_name}, {preVetEducation.Education_type} in {preVetEducation.Major_name}
        {" ("}{preVetEducation.Start_Date} - {preVetEducation.End_Date}{") "}
        <DeleteButtonOptions<PreVetEducationItemType>
          status = {status}
          setStatus = {setStatus}
          dataType = {preVetEducation}
          handleDeleteOnClick = {handleDeleteOnClick}
        />
      </li>
    )
  }

  const renderSavedEducationList = () => {
    return (
      <ul>
        {preVetEducation.map((preVetEducation) => (
          <RenderSingleSavedEducation
            key = {preVetEducation.pre_vet_education_mappingID}
            {...preVetEducation}
          />
        ))}
      </ul>
    )
  }

  if (_.isEmpty(_.uniq(listDetails.preVetSchools?.map((item) => item.School_name)))) return <p> Loading... </p>

  return (
    <>
      {renderSelectSchool()}

      {renderSelectMajor()}

      {renderSelectEducationType()}

      {renderEducationTime()}

      {renderAddAndSaveButton()}

      {renderSavedEducationList()}
      <RenderMessageSection
        confirmationMessage = {preVetEducationConfirmation}
        whatIsBeingSaved = "Pre-Vet Education"
      />
    </>
  )
}
