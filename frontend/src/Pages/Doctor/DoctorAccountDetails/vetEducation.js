import React from "react";
import { Card, Button } from "react-bootstrap";
import EducationTime from "./educationTime";
import { handleAddVetEducation } from "../../../Custom Hooks/Hooks for Doctor Account Details/add";
import { handleDeleteVetEducation } from "../../../Custom Hooks/Hooks for Doctor Account Details/delete";
import { saveVetSchool } from "../../../Custom Hooks/Hooks for Doctor Account Details/save";

export default function RenderVetEducationSection (props){
    return(
      <Card>
        <Card.Header>
            Vet Education
        </Card.Header>
        <Card.Body>
            {renderIsVetEducation(props)}
        </Card.Body>
    </Card>
  )
};

function renderIsVetEducation(props){
    const allChoicesFilled = props.selectedVetSchool && props.selectedVetEducationType;

    if(Array.from(new Set(props.listDetails[7]?.map((item) => item.School_name))).length > 0){
      return(
        <>
          <label htmlFor="vet-school">Select a Veterinary School: </label>
          <select
            id="vet-school"
            name="vet-school"
            value={props.selectedVetSchool}
            onChange={(e) => props.setSelectedVetSchool(e.target.value)}
          >
            <option value="">Choose a School</option>
            {Array.from(new Set(props.listDetails[7]?.map((item) => item.School_name))).map(
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
                  <option value="">Choose an Education Type</option>
                  {Array.from(new Set(props.listDetails[8]?.map((item) => item.Education_type))).map(
                    (VetEdType, index) => (
                      <option key={index} value={VetEdType}>
                        {VetEdType}
                      </option>
                    ))}
                </select>
                {allChoicesFilled &&
                  <EducationTime 
                  startMonth= {props.startMonth} 
                  setStartMonth = {props.setStartMonth}
                  endMonth = {props.endMonth} 
                  setEndMonth = {props.setEndMonth}
                  startYear = {props.startYear} 
                  setStartYear = {props.setStartYear}
                  endYear = {props.endYear} 
                  setEndYear = {props.setEndYear}
                    /> }
                  {allChoicesFilled && (
                    <Button onClick={() => handleAddVetEducation(
                      props.selectedVetSchool,
                      props.setSelectedVetSchool, 
                      props.selectedVetEducationType, 
                      props.setSelectedVetEducationType,
                      props.vetEducation, 
                      props.setVetEducation, 
                      props.startMonth,
                      props.setStartMonth, 
                      props.endMonth,
                      props.setEndMonth,
                      props.startYear,
                      props.setStartYear, 
                      props.endYear,
                      props.setEndYear
                      )}>Add</Button>
                  )}
                  </>
                )}
          <ul>
            {props.vetEducation.map((vet_education) => (
              <li key={vet_education.specialties_listID}>
                {vet_education.School_name}, {vet_education.Education_type}{" "}{vet_education.Start_Date} --- {vet_education.End_Date} 
                <Button onClick={() => handleDeleteVetEducation(vet_education, props.vetEducation, props.setVetEducation)}>X</Button>
              </li>
            ))}
          </ul>
          <Button 
            variant="success" 
            onClick={()=>saveVetSchool(props.vetEducation, props.listDetails, props.setShowSavedVetMessage, props.setShowSameVetMessage, props.setShowSaveVetProblemMessage)}
            >
              Save</Button>
          <span className={`fade ${props.showSavedVetMessage ? 'show' : ''}`}>Vet education saved!</span>
          <span className={`fade ${props.showSameVetMessage ? 'show' : ''}`}>Same Vet Education data!</span>
          <span className={`fade ${props.showSaveVetProblemMessage ? 'show' : ''}`}>Problem Saving Vet Education data!</span>
        </>
      )
    }else{
      return(
        <p>Loading...</p>
      )
    }
};
