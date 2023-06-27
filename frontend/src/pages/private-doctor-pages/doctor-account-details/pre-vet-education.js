import _ from "lodash"
import { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { handleAddEducation } from "../../../custom-hooks/account-details-hooks/add";
import { useConfirmationMessage } from "../../../custom-hooks/use-confirmation-message";
import { savePreVetEducation } from "../../../custom-hooks/account-details-hooks/save-doctor-account-details";
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

  if (_.isEmpty(_.uniq(listDetails.preVetSchools?.map((item) => item.School_name)))) return <p> Loading... </p>

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
          {Array.from(new Set(listDetails.preVetSchools?.map((item) => item.School_name))).map(
            (school, index) => (
              <option key = {index} value = {school}>
                {school}
              </option>
            ))}
        </select>
      </div>
    )
  }

  const renderSelectMajor = () => {
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
          {_.uniq(listDetails.majors?.map((item) => item.Major_name)).map(
        (major, index) => (
          <option key = {index} value = {major}>
            {major}
          </option>
        ))}
        </select>
      </>
    )
  }

  const renderSelectEducationType = () => {
    return (
      <div>
          <>
            <label htmlFor = "education-type">Select a Type of Education: </label>
            <select
              id = "education-type"
              name = "education-type"
              value = {selectedPreVetEducationType}
              onChange = {(event) => setSelectedPreVetEducationType(event.target.value)}
            >
              <option value = "" disabled>Choose an Education Type</option>
              {Array.from(new Set(listDetails.preVetEducationTypes?.map((item) => item.Education_type))).map(
                (preVetEdType, index) => (
                  <option key = {index} value = {preVetEdType}>
                    {preVetEdType}
                  </option>
                ))}
            </select>
          </>
      </div>
    )
  }

  const renderEducationTime = () => {
    return (
      <>
        <EducationTime 
          timeState = {timeState}
          setTimeState = {setTimeState}
        />
      </>
    )
  }

  const renderAddAndSaveButton = () => {
    return (
      <>
        <Button 
          onClick = {() => {
            const selectedEducationObj = handleAddEducation(
              selectedPreVetSchool,
              setSelectedPreVetSchool,
              selectedPreVetEducationType,
              setSelectedPreVetEducationType,
              preVetEducation,
              setPreVetEducation,
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
      </>
    )
  }

  const renderSavedEducationList = () => {
    return (
      <ul>
        {preVetEducation.map((pre_vet_education, index) => (
          <li key = {index}>
            {pre_vet_education.School_name}, {pre_vet_education.Education_type} in {pre_vet_education.Major_name}
              {" ("}{pre_vet_education.Start_Date} - {pre_vet_education.End_Date} {")"}
                <Button
                  variant = "danger"
                  onClick = {() =>
                  savePreVetEducation(
                    pre_vet_education.pre_vet_education_mappingID, 
                    preVetEducation, 
                    setPreVetEducation,
                    listDetails, 
                    setPreVetEducationConfirmation,
                    'delete'
                  )}
                  >
                  Delete
                </Button>
          </li>
        ))}
      </ul>
    )
  }
  
  const renderMessageSection = () => {
    return (
      <span className = {`fade ${preVetEducationConfirmation.messageType ? 'show' : ''}`}>
        {preVetEducationConfirmation.messageType === 'saved' && 'Pre-Vet Education saved!'}
        {preVetEducationConfirmation.messageType === 'same' && 'Same Pre-Vet Education data!'}
        {preVetEducationConfirmation.messageType === 'problem' && 'Problem Saving Pre-Vet Education!'}
        {preVetEducationConfirmation.messageType === 'none' && 'No Pre-Vet Education selected'}
      </span>
    )
  }

  return (
    <>
      {renderSelectSchool()}

      {selectedPreVetSchool &&
        renderSelectMajor()
      }

      {selectedMajor && 
        renderSelectEducationType()
      }

      {selectedPreVetEducationType && 
        renderEducationTime()
      }

      {allChoicesFilled && 
        renderAddAndSaveButton()
      }
      
      {renderSavedEducationList()}
      
      {renderMessageSection()}
    </>
  )
};
