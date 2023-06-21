import _ from "lodash"
import React from "react";
import { Card, Button } from "react-bootstrap";
import { useConfirmationMessage } from "../../../custom-hooks/use-confirmation-message";
import { handleAddVetEducation } from "../../../custom-hooks/account-details-hooks/add";
import { saveVetEducation } from "../../../custom-hooks/account-details-hooks/save-doctor-account-details";
import EducationTime from "./education-time";

export default function RenderVetEducationSection (props) {
  return(
    <Card className="mb-3">
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
  const [vetEducationConfirmation, setVetEducationConfirmation] = useConfirmationMessage();

  const allChoicesFilled = props.selectedVetSchool && props.selectedVetEducationType;

  if (_.isEmpty(_.uniq(props.listDetails.vetSchools?.map((item) => item.School_name)))) return <p>Loading...</p>

  return (
    <>
      <label htmlFor="vet-school">Select a Veterinary School: </label>
      <select
        id="vet-school"
        name="vet-school"
        value={props.selectedVetSchool}
        onChange={(e) => props.setSelectedVetSchool(e.target.value)}
      >
        <option value="" disabled>Choose a School</option>
        {Array.from(new Set(props.listDetails.vetSchools?.map((item) => item.School_name))).map(
          (school, index) => (
            <option key={index} value={school}>
              {school}
            </option>
          ))}
      </select>
      <br />
      {props.selectedVetSchool && (
          <>
          <label htmlFor="education-type">Select a Type of Veterinary Education: </label>
            <select
              id="vet-education"
              name="vet-education"
              value={props.selectedVetEducationType}
              onChange={(event) => props.setSelectedVetEducationType(event.target.value)}
            >
              <option value="" disabled>Choose an Education Type</option>
              {Array.from(new Set(props.listDetails.vetEducationTypes?.map((item) => item.Education_type))).map(
                (VetEdType, index) => (
                  <option key={index} value={VetEdType}>
                    {VetEdType}
                  </option>
                ))}
            </select>
            {allChoicesFilled &&
              <EducationTime 
              timeState = {props.timeState}
              setTimeState = {props.setTimeState}
                /> }
              {allChoicesFilled && (
                <Button onClick = {() => {
                  const selectedEducationObj = handleAddVetEducation(
                  props.selectedVetSchool,
                  props.setSelectedVetSchool, 
                  props.selectedVetEducationType, 
                  props.setSelectedVetEducationType,
                  props.vetEducation, 
                  props.setVetEducation,
                  props.timeState,
                  props.setTimeState
                  )
                  saveVetEducation (
                    selectedEducationObj,
                    props.vetEducation,
                    props.setVetEducation,
                    props.listDetails,
                    setVetEducationConfirmation,
                    'add'
                  )
                }}>Add</Button>
              )}
              </>
            )}
      <ul>
        {props.vetEducation.map((vet_education) => (
          <li key={vet_education.vet_education_mappingID}>
            {vet_education.School_name}, {vet_education.Education_type}{": "}{vet_education.Start_Date} --- {vet_education.End_Date} 
            <Button onClick={() => 
              saveVetEducation(
                vet_education.vet_education_mappingID,
                props.vetEducation, 
                props.setVetEducation,
                props.listDetails,
                setVetEducationConfirmation,
                'delete'
              )}>X</Button>
          </li>
        ))}
      </ul>
        <span className={`fade ${vetEducationConfirmation.messageType ? 'show' : ''}`}>
          {vetEducationConfirmation.messageType === 'saved' && 'Vet Education saved!'}
          {vetEducationConfirmation.messageType === 'same' && 'Same Vet Education data!'}
          {vetEducationConfirmation.messageType === 'problem' && 'Problem Saving Vet Education!'}
          {vetEducationConfirmation.messageType === 'none' && 'No Vet Education selected'}
        </span>
    </>
  )
};
