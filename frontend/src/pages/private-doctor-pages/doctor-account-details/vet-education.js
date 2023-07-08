import _ from "lodash"
import { useState, useCallback } from "react";
import { Card, Button } from "react-bootstrap";
import { renderMessageSection } from "../../../components/saved-message-section";
import { handleAddEducation } from "../../../custom-hooks/account-details-hooks/add";
import { useConfirmationMessage } from "../../../custom-hooks/use-confirmation-message";
import { saveVetEducation } from "../../../custom-hooks/account-details-hooks/save-doctor-account-details";
import { renderConfirmDeleteButton, renderInitialDeleteButton, renderNevermindButton } from "../../../components/delete-buttons";
import EducationTime from "./education-time";

export default function RenderVetEducationSection (props) {
  return(
    <Card className = "mb-3">
      <Card.Header>
        Vet Education
      </Card.Header>
      <Card.Body>
        {RenderIsVetEducation(props)}
      </Card.Body>
  </Card>
  );
};

function RenderIsVetEducation(props) {
  const { listDetails, timeState, setTimeState, vetEducation, setVetEducation } = props;
  const [selectedVetSchool, setSelectedVetSchool] = useState('');
  const [selectedVetEducationType, setSelectedVetEducationType] = useState('');

  const [vetEducationConfirmation, setVetEducationConfirmation] = useConfirmationMessage();

  const allChoicesFilled = selectedVetSchool && selectedVetEducationType &&
    timeState.startMonth && timeState.endMonth && timeState.startYear && timeState.endYear;

  const renderSelectSchool = () => {
    return (
      <div>
        <label htmlFor = "vet-school">Select a Veterinary School: </label>
        <select
          id = "vet-school"
          name = "vet-school"
          value = {selectedVetSchool}
          onChange = {(e) => setSelectedVetSchool(e.target.value)}
        >
          <option value = "" disabled>Choose a School</option>
          {_.uniqBy(listDetails.vetSchools, 'School_name').map(
              (school) => (
                <option key = {school.vet_school_listID} value = {school.School_name}>
                  {school.School_name}
                </option>
              )
          )}
        </select>
      </div>
    )
  }

  const renderSelectEducationType = () => {
    if (!selectedVetSchool) return null;
    return (
      <div>
        <label htmlFor = "education-type">Select a Type of Veterinary Education: </label>
        <select
          id = "vet-education"
          name = "vet-education"
          value = {selectedVetEducationType}
          onChange = {(event) => setSelectedVetEducationType(event.target.value)}
        >
          <option value = "" disabled>Choose an Education Type</option>
          {_.uniqBy(listDetails.vetEducationTypes, 'Education_type').map(
            (vetEdType) => (
              <option key = {vetEdType.vet_education_typeID} value = {vetEdType.Education_type}>
                {vetEdType.Education_type}
              </option>
            )
          )}
        </select>
      </div>
    )
  }

  const renderEducationTime = () => {
    if (!selectedVetEducationType) return null;
    return (
      <EducationTime
        timeState = {timeState}
        setTimeState = {setTimeState}
      />
    )
  }

  const renderAddAndSaveButton = () => {
    if (!allChoicesFilled) return null;
    return (
      <Button onClick = {() => {
        const selectedEducationObj = handleAddEducation(
          selectedVetSchool,
          setSelectedVetSchool,
          selectedVetEducationType,
          setSelectedVetEducationType,
          timeState,
          setTimeState
        );
        saveVetEducation (
          selectedEducationObj,
          vetEducation,
          setVetEducation,
          listDetails,
          setVetEducationConfirmation,
          'add'
        )
      }}
      >
        Add
      </Button>
    )
  }

  const handleDeleteOnClick = useCallback(
    (vet_education) => {
      saveVetEducation(
        vet_education.vet_education_mappingID,
        vetEducation,
        setVetEducation,
        listDetails,
        setVetEducationConfirmation,
        'delete'
      )
    },
    [vetEducation, setVetEducation, setVetEducationConfirmation]
  );

  const renderDeleteButtonOptions = (status, setStatus, vet_education) => {
    return (
      <>
        {renderInitialDeleteButton(status, setStatus)}
        {renderNevermindButton(status, setStatus)}
        {renderConfirmDeleteButton(status, vet_education, handleDeleteOnClick)}
      </>
    )
  }

  const RenderSingleSavedEducation = (vet_education) => {
    const [status, setStatus] = useState('initial');
    return (
      <li>
        {vet_education.School_name}, {vet_education.Education_type}
          {" (" + vet_education.Start_Date} - {vet_education.End_Date + ")"}
        {renderDeleteButtonOptions(status, setStatus, vet_education)}
      </li>
    )
  }

  const renderSavedEducationList = () => {
    return (
      <ul>
        {vetEducation.map((vet_education) => (
          <RenderSingleSavedEducation
            key = {vet_education.vet_education_mappingID}
            {...vet_education}
          />
        ))}
      </ul>
    )
  }

  if (_.isEmpty(_.uniq(listDetails.vetSchools?.map((item) => item.School_name)))) return <p>Loading...</p>

  return (
    <>
      {renderSelectSchool()}

      {renderSelectEducationType()}

      {renderEducationTime()}

      {renderAddAndSaveButton()}

      {renderSavedEducationList()}

      {renderMessageSection(vetEducationConfirmation, 'Vet Education')}
    </>
  )
};
