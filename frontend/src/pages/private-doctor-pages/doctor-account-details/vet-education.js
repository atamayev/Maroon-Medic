import _ from "lodash"
import React from "react";
import { Card, Button } from "react-bootstrap";
import { useConfirmationMessage } from "../../../custom-hooks/use-confirmation-message";
import { handleAddVetEducation } from "../../../custom-hooks/account-details-hooks/add";
import { saveVetEducation } from "../../../custom-hooks/account-details-hooks/save-doctor-account-details";
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
  const { listDetails, selectedVetSchool, setSelectedVetSchool, selectedVetEducationType, setSelectedVetEducationType, timeState, setTimeState, vetEducation, setVetEducation } = props;

  const [vetEducationConfirmation, setVetEducationConfirmation] = useConfirmationMessage();

  const allChoicesFilled = selectedVetSchool && selectedVetEducationType;

  if (_.isEmpty(_.uniq(listDetails.vetSchools?.map((item) => item.School_name)))) return <p>Loading...</p>

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
          {Array.from(new Set(listDetails.vetSchools?.map((item) => item.School_name))).map(
            (school, index) => (
              <option key = {index} value = {school}>
                {school}
              </option>
            ))}
        </select>
      </div>
    )
  }

  const renderSelectEducationType = () => {
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
            {Array.from(new Set(listDetails.vetEducationTypes?.map((item) => item.Education_type))).map(
              (VetEdType, index) => (
                <option key = {index} value = {VetEdType}>
                  {VetEdType}
                </option>
              ))}
          </select>
      </div>
    )
  }
  const renderEducationTime = () => {
    return (
      <>
        {allChoicesFilled &&
          <EducationTime 
            timeState = {timeState}
            setTimeState = {setTimeState}
          />
        }
      </>
    )
  }
  const renderAddAndSaveButton = () => {
    return (
      <Button onClick = {() => {
        const selectedEducationObj = handleAddVetEducation(
        selectedVetSchool,
        setSelectedVetSchool, 
        selectedVetEducationType, 
        setSelectedVetEducationType,
        vetEducation, 
        setVetEducation,
        timeState,
        setTimeState
        )
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

  const renderSavedEducationList = () => {
    return (
      <ul>
        {vetEducation.map((vet_education) => (
          <li key = {vet_education.vet_education_mappingID}>
            {vet_education.School_name}, {vet_education.Education_type}{": "}{vet_education.Start_Date} --- {vet_education.End_Date} 
            <Button onClick = {() => 
              saveVetEducation(
                vet_education.vet_education_mappingID,
                vetEducation, 
                setVetEducation,
                listDetails,
                setVetEducationConfirmation,
                'delete'
              )}>X</Button>
          </li>
        ))}
      </ul>
    )
  }
  
  const renderMessageSection = () => {
    return (
      <span className = {`fade ${vetEducationConfirmation.messageType ? 'show' : ''}`}>
        {vetEducationConfirmation.messageType === 'saved' && 'Vet Education saved!'}
        {vetEducationConfirmation.messageType === 'same' && 'Same Vet Education data!'}
        {vetEducationConfirmation.messageType === 'problem' && 'Problem Saving Vet Education!'}
        {vetEducationConfirmation.messageType === 'none' && 'No Vet Education selected'}
      </span>
    )
  }

  return (
    <>
      {renderSelectSchool()}

      {selectedVetSchool && 
        renderSelectEducationType()
      }

      {allChoicesFilled && 
        (
          <>
            {renderEducationTime()}
            {renderAddAndSaveButton()}
          </>
        )
      }
      
      {renderSavedEducationList()}

      {renderMessageSection()}
    </>
  )
};
