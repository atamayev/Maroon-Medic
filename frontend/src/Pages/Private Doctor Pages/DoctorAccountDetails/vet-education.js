import React from "react";
import { Card, Button } from "react-bootstrap";
import EducationTime from "./education-time";
import { handleAddVetEducation } from "../../../Custom Hooks/Hooks for Account Details/add";
import { handleDeleteVetEducation } from "../../../Custom Hooks/Hooks for Account Details/delete";
import { saveVetSchool } from "../../../Custom Hooks/Hooks for Account Details/DoctorAccountDetails/saveDoctorAccountDetails";

export default function RenderVetEducationSection (props){
  return(
    <Card className="mb-3">
      <Card.Header>
          Vet Education
      </Card.Header>
      <Card.Body>
          {renderIsVetEducation(props)}
      </Card.Body>
  </Card>
  );
};

function renderIsVetEducation(props){
  const allChoicesFilled = props.selectedVetSchool && props.selectedVetEducationType;

  if(Array.from(new Set(props.listDetails[6]?.map((item) => item.School_name))).length > 0){
    return(
      <>
        <label htmlFor="vet-school">Select a Veterinary School: </label>
        <select
          id="vet-school"
          name="vet-school"
          value={props.selectedVetSchool}
          onChange={(e) => props.setSelectedVetSchool(e.target.value)}
        >
          <option value="" disabled>Choose a School</option>
          {Array.from(new Set(props.listDetails[6]?.map((item) => item.School_name))).map(
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
                {Array.from(new Set(props.listDetails[7]?.map((item) => item.Education_type))).map(
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
                  <Button onClick={() => handleAddVetEducation(
                    props.selectedVetSchool,
                    props.setSelectedVetSchool, 
                    props.selectedVetEducationType, 
                    props.setSelectedVetEducationType,
                    props.vetEducation, 
                    props.setVetEducation,
                    props.timeState,
                    props.setTimeState
                    )}>Add</Button>
                )}
                </>
              )}
        <ul>
          {props.vetEducation.map((vet_education) => (
            <li key={vet_education.vet_education_mappingID}>
              {vet_education.School_name}, {vet_education.Education_type}{": "}{vet_education.Start_Date} --- {vet_education.End_Date} 
              <Button onClick={() => handleDeleteVetEducation(vet_education, props.vetEducation, props.setVetEducation)}>X</Button>
            </li>
          ))}
        </ul>
        <Button 
          variant="success" 
          onClick={()=>saveVetSchool(props.vetEducation, props.listDetails, props.setVetEducationConfirmation)}
          >
            Save</Button>
            <span className={`fade ${props.vetEducationConfirmation.messageType ? 'show' : ''}`}>
            {props.vetEducationConfirmation.messageType === 'saved' && 'Vet Education saved!'}
            {props.vetEducationConfirmation.messageType === 'same' && 'Same Vet Education data!'}
            {props.vetEducationConfirmation.messageType === 'problem' && 'Problem Saving Vet Education!'}
            {props.vetEducationConfirmation.messageType === 'none' && 'No Vet Education selected'}
          </span>
      </>
    )
  }else{
    return(
      <p>Loading...</p>
    )
  }
};
