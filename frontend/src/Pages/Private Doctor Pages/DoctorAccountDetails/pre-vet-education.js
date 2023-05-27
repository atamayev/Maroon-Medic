import React from "react";
import { Card, Button } from "react-bootstrap";
import EducationTime from "./education-time";
import { handleAddPreVetEducation } from "../../../Custom Hooks/Hooks for Doctor Account Details/add";
import { handleDeletePreVetEducation } from "../../../Custom Hooks/Hooks for Doctor Account Details/delete";
import { savePreVetSchool } from "../../../Custom Hooks/Hooks for Doctor Account Details/save";

export default function RenderPreVetEducationSection(props){
  return(
    <Card>
    <Card.Header>
      Pre-vet education
    </Card.Header>
    <Card.Body>
      {renderIsPreVetEducation(props)}
    </Card.Body>
  </Card>
  );
};

function renderIsPreVetEducation(props){
  const allChoicesFilled = props.selectedPreVetSchool && props.selectedMajor && props.selectedPreVetEducationType;

  if(Array.from(new Set(props.listDetails[4]?.map((item) => item.School_name))).length > 0){
    return(
      <>
        <label htmlFor="pre-vet-school">Select a school: </label>
        <select
          id="pre-vet-school"
          name="pre-vet-school"
          value={props.selectedPreVetSchool}
          onChange={(e) => props.setSelectedPreVetSchool(e.target.value)}
        >
          <option value="">Choose a School</option>
          {Array.from(new Set(props.listDetails[4]?.map((item) => item.School_name))).map(
            (school, index) => (
              <option key={index} value={school}>
                {school}
              </option>
            ))}
        </select>
        <br />
        {props.selectedPreVetSchool && (
          <>
            <label htmlFor="major">Select a Major: </label>
            <select
              id="major"
              name="major"
              value={props.selectedMajor}
              onChange = {(event) => props.setSelectedMajor(event.target.value)}
            >
              <option value="">Choose a major</option>
              {Array.from(new Set(props.listDetails[6]?.map((item) => item.Major_name))).map(
            (major, index) => (
              <option key={index} value={major}>
                {major}
              </option>
            ))}
            </select>
          </>
        )}
        <br/>
          {props.selectedMajor && (
            <>
            <label htmlFor="education-type">Select a Type of Education: </label>
              <select
                id="education-type"
                name="education-type"
                value={props.selectedPreVetEducationType}
                onChange={(event) => props.setSelectedPreVetEducationType(event.target.value)}
              >
                <option value="">Choose an Education Type</option>
                {Array.from(new Set(props.listDetails[5]?.map((item) => item.Education_type))).map(
                  (preVetEdType, index) => (
                    <option key={index} value={preVetEdType}>
                      {preVetEdType}
                    </option>
                  ))}
              </select>
              {allChoicesFilled &&
                <EducationTime 
                  timeState = {props.timeState}
                  setTimeState = {props.setTimeState}
                  /> }
                {allChoicesFilled && (
                  <Button onClick={() => handleAddPreVetEducation(
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
                    )}>Add</Button>
                )}              
                </>
              )}
        <ul>
          {props.preVetEducation.map((pre_vet_education) => (
            <li key={pre_vet_education.specialties_listID}>
              {pre_vet_education.School_name}, {pre_vet_education.Education_type} in {pre_vet_education.Major_name}{": "}{pre_vet_education.Start_Date} --- {pre_vet_education.End_Date} 
              <Button onClick={() => handleDeletePreVetEducation(pre_vet_education, props.preVetEducation, props.setPreVetEducation)}>X</Button>
            </li>
          ))}
        </ul>
        <Button 
          variant="success" 
          onClick={()=>savePreVetSchool(props.preVetEducation, props.listDetails, props.setPreVetEducationConfirmation)}
          >
            Save</Button>
        <span className={`fade ${props.preVetEducationConfirmation.messageType === 'saved' ? 'show' : ''}`}>Pre-Vet Education saved!</span>
        <span className={`fade ${props.preVetEducationConfirmation.messageType === 'same' ? 'show' : ''}`}>Same Pre-Vet Education data!</span>
        <span className={`fade ${props.preVetEducationConfirmation.messageType === 'problem' ? 'show' : ''}`}>Problem Saving Pre-Vet Education!</span>      </>
    )
  }else{
    return(
      <p>Loading...</p>
    )
  }
};
