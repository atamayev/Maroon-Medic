import _ from "lodash"
import React from "react";
import { Card, Button } from "react-bootstrap";
import { handleAddPreVetEducation } from "../../../custom-hooks/account-details-hooks/add";
import { useConfirmationMessage } from "../../../custom-hooks/use-confirmation-message";
import { savePreVetEducation } from "../../../custom-hooks/account-details-hooks/save-doctor-account-details";
import EducationTime from "./education-time";

export default function RenderPreVetEducationSection(props) {
  return(
    <Card className="mb-3 mt-3">
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
  const [preVetEducationConfirmation, setPreVetEducationConfirmation] = useConfirmationMessage();

  const allChoicesFilled = props.selectedPreVetSchool && props.selectedMajor && props.selectedPreVetEducationType;

  if (_.isEmpty(_.uniq(props.listDetails.preVetSchools?.map((item) => item.School_name)))) return <p> Loading... </p>

  const renderSelectSchool = () => {
    return (
      <div>
        <label htmlFor="pre-vet-school">Select a school: </label>
        <select
          id="pre-vet-school"
          name="pre-vet-school"
          value={props.selectedPreVetSchool}
          onChange={(e) => props.setSelectedPreVetSchool(e.target.value)}
        >
          <option value="" disabled>Choose a School</option>
          {Array.from(new Set(props.listDetails.preVetSchools?.map((item) => item.School_name))).map(
            (school, index) => (
              <option key={index} value={school}>
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
        <label htmlFor="major">Select a Major: </label>
        <select
          id="major"
          name="major"
          value={props.selectedMajor}
          onChange = {(event) => props.setSelectedMajor(event.target.value)}
        >
          <option value="" disabled>Choose a major</option>
          {_.uniq(props.listDetails.majors?.map((item) => item.Major_name)).map(
        (major, index) => (
          <option key={index} value={major}>
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
        {props.selectedMajor && (
          <>
            <label htmlFor="education-type">Select a Type of Education: </label>
            <select
              id="education-type"
              name="education-type"
              value={props.selectedPreVetEducationType}
              onChange={(event) => props.setSelectedPreVetEducationType(event.target.value)}
            >
              <option value="" disabled>Choose an Education Type</option>
              {Array.from(new Set(props.listDetails.preVetEducationTypes?.map((item) => item.Education_type))).map(
                (preVetEdType, index) => (
                  <option key={index} value={preVetEdType}>
                    {preVetEdType}
                  </option>
                ))}
            </select>
          </>
        )}
      </div>
    )
  }

  const renderEducationTime = () => {
    return (
      <>
        {allChoicesFilled &&
          <EducationTime 
            timeState = {props.timeState}
            setTimeState = {props.setTimeState}
          />
        }
      </>
    )
  }

  const renderAddAndSaveButton = () => {
    return (
      <>
        <Button 
          onClick = {() => {
            const selectedEducationObj = handleAddPreVetEducation(
              props.selectedPreVetSchool, 
              props.selectedMajor, 
              props.selectedPreVetEducationType, 
              props.preVetEducation, 
              props.setPreVetEducation, 
              props.setSelectedPreVetSchool, 
              props.setSelectedMajor, 
              props.setSelectedPreVetEducationType, 
              props.timeState,
              props.setTimeState
              )
              savePreVetEducation (
                selectedEducationObj,
              props.preVetEducation,
              props.setPreVetEducation,
              props.listDetails,
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
        {props.preVetEducation.map((pre_vet_education) => (
          <li key={pre_vet_education.pre_vet_education_mappingID}>
            {pre_vet_education.School_name}, {pre_vet_education.Education_type} in {pre_vet_education.Major_name}{": "}{pre_vet_education.Start_Date} --- {pre_vet_education.End_Date} 
            <Button onClick={() =>
              savePreVetEducation(
                pre_vet_education.pre_vet_education_mappingID, 
                props.preVetEducation, 
                props.setPreVetEducation,
                props.listDetails, 
                setPreVetEducationConfirmation,
                'delete'
              )}>X</Button>
          </li>
        ))}
      </ul>
    )
  }
  
  const renderMessageSection = () => {
    return (
      <span className={`fade ${preVetEducationConfirmation.messageType ? 'show' : ''}`}>
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

      {props.selectedPreVetSchool &&
        renderSelectMajor()
      }

      {props.selectedMajor && 
        renderSelectEducationType()
      }

      {allChoicesFilled && 
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
