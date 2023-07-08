import _ from "lodash"
import { useState, useCallback } from "react";
import { Card, Button } from "react-bootstrap";
import { renderMessageSection } from "../../../components/saved-message-section";
import { handleAddEducation } from "../../../custom-hooks/account-details-hooks/add";
import { useConfirmationMessage } from "../../../custom-hooks/use-confirmation-message";
import { savePreVetEducation } from "../../../custom-hooks/account-details-hooks/save-doctor-account-details";
import { renderConfirmDeleteButton, renderInitialDeleteButton, renderNevermindButton } from "../../../components/delete-buttons";
import EducationTime from "./education-time";

export default function RenderPreVetEducationSection(props) {
  return(
    <Card className = "mb-3 mt-3">
      <Card.Header>
        Pre-vet education
      </Card.Header>
      <Card.Body>
        {RenderIsPreVetEducation(props)}
      </Card.Body>
    </Card>
  );
};

function RenderIsPreVetEducation(props) {
  const [selectedPreVetSchool, setSelectedPreVetSchool] = useState('');
  const [selectedMajor, setSelectedMajor] = useState('');
  const [selectedPreVetEducationType, setSelectedPreVetEducationType] = useState('');
  const { listDetails, timeState, setTimeState, preVetEducation, setPreVetEducation } = props;
  const [preVetEducationConfirmation, setPreVetEducationConfirmation] = useConfirmationMessage();

  const allChoicesFilled = selectedPreVetSchool && selectedMajor && selectedPreVetEducationType &&
    timeState.startMonth && timeState.endMonth && timeState.startYear && timeState.endYear;

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
          {_.uniqBy(listDetails.preVetSchools, 'School_name').map(
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
          {_.uniqBy(listDetails.majors, 'Major_name').map(
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
          {_.uniqBy(listDetails.preVetEducationTypes, 'Education_type').map(
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

  const renderAddAndSaveButton = () => {
    if (!allChoicesFilled) return null
    return (
      <Button
        onClick = {() => {
          const selectedEducationObj = handleAddEducation(
            selectedPreVetSchool,
            setSelectedPreVetSchool,
            selectedPreVetEducationType,
            setSelectedPreVetEducationType,
            timeState,
            setTimeState,
            selectedMajor,
            setSelectedMajor
          );
          savePreVetEducation (
            selectedEducationObj,
            preVetEducation,
            setPreVetEducation,
            listDetails,
            setPreVetEducationConfirmation,
            'add'
          )
        }}
      >
        Add
      </Button>
    )
  }

  const handleDeleteOnClick = useCallback(
    (pre_vet_education) => {
      savePreVetEducation(
        pre_vet_education.pre_vet_education_mappingID,
        preVetEducation,
        setPreVetEducation,
        listDetails,
        setPreVetEducationConfirmation,
        'delete'
      )
    },
    [preVetEducation, setPreVetEducation, setPreVetEducationConfirmation]
  );

  const renderDeleteButtonOptions = (status, setStatus, pre_vet_education) => {
    return (
      <>
        {renderInitialDeleteButton(status, setStatus)}
        {renderNevermindButton(status, setStatus)}
        {renderConfirmDeleteButton(status, pre_vet_education, handleDeleteOnClick)}
      </>
    )
  }

  const RenderSingleSavedEducation = (pre_vet_education) => {
    const [status, setStatus] = useState('initial');
    return (
      <li>
        {pre_vet_education.School_name}, {pre_vet_education.Education_type} in {pre_vet_education.Major_name}
          {" ("}{pre_vet_education.Start_Date} - {pre_vet_education.End_Date} {")"}
        {renderDeleteButtonOptions(status, setStatus, pre_vet_education)}
      </li>
    )
  }

  const renderSavedEducationList = () => {
    return (
      <ul>
        {preVetEducation.map((pre_vet_education) => (
          <RenderSingleSavedEducation
            key = {pre_vet_education.pre_vet_education_mappingID}
            {...pre_vet_education}
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

      {renderMessageSection(preVetEducationConfirmation, 'Pre-Vet Education')}
    </>
  )
};
