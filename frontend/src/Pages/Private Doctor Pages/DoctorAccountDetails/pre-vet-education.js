import React from "react";
import { Card, Button } from "react-bootstrap";
import EducationTime from "./education-time";
import { handleAddPreVetEducation } from "../../../Custom Hooks/Hooks for Account Details/add";
import { savePreVetEducation } from "../../../Custom Hooks/Hooks for Account Details/DoctorAccountDetails/saveDoctorAccountDetails";
import { useConfirmationMessage } from "../../../Custom Hooks/useConfirmationMessage";

export default function RenderPreVetEducationSection(props){
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

function RenderIsPreVetEducation(props){
  const [preVetEducationConfirmation, setPreVetEducationConfirmation] = useConfirmationMessage();

  const allChoicesFilled = props.selectedPreVetSchool && props.selectedMajor && props.selectedPreVetEducationType;

  if(!Array.from(new Set(props.listDetails[3]?.map((item) => item.School_name))).length) return <p> Loading... </p>
  return(
    <>
      <label htmlFor="pre-vet-school">Select a school: </label>
      <select
        id="pre-vet-school"
        name="pre-vet-school"
        value={props.selectedPreVetSchool}
        onChange={(e) => props.setSelectedPreVetSchool(e.target.value)}
      >
        <option value="" disabled>Choose a School</option>
        {Array.from(new Set(props.listDetails[3]?.map((item) => item.School_name))).map(
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
            <option value="" disabled>Choose a major</option>
            {Array.from(new Set(props.listDetails[5]?.map((item) => item.Major_name))).map(
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
              <option value="" disabled>Choose an Education Type</option>
              {Array.from(new Set(props.listDetails[4]?.map((item) => item.Education_type))).map(
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
                  }}>Add</Button>
              )}
          </>
        )}
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
        <span className={`fade ${preVetEducationConfirmation.messageType ? 'show' : ''}`}>
          {preVetEducationConfirmation.messageType === 'saved' && 'Pre-Vet Education saved!'}
          {preVetEducationConfirmation.messageType === 'same' && 'Same Pre-Vet Education data!'}
          {preVetEducationConfirmation.messageType === 'problem' && 'Problem Saving Pre-Vet Education!'}
          {preVetEducationConfirmation.messageType === 'none' && 'No Pre-Vet Education selected'}
        </span>
      </>
  )
};
