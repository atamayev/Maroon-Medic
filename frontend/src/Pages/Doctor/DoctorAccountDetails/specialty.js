import React from "react";
import { Card, Button} from "react-bootstrap";
import { handleSelectSpecialty } from "../../../Custom Hooks/Hooks for Doctor Account Details/select";
import { handleAddSpecialty } from "../../../Custom Hooks/Hooks for Doctor Account Details/add";
import { handleDeleteSpecialty } from "../../../Custom Hooks/Hooks for Doctor Account Details/delete";
import { saveSpecialies } from "../../../Custom Hooks/Hooks for Doctor Account Details/save";

export default function RenderSpecialtySection (props){
    return(
        <Card>
          <Card.Header>
              Specialties
          </Card.Header>
          <Card.Body>
            {renderIsSpecialty(props)}
          </Card.Body>
        </Card>
    )
};

function renderIsSpecialty(props){
  const specialties = props.selectedOrganization
  ? props.listDetails[3].filter((item) => item.Organization_name === props.selectedOrganization)
  : [];

  if(Array.from(new Set(props.listDetails[3]?.map((item) => item.Organization_name))).length){
    return(
      <>
        <label htmlFor="organization">Select an organization: </label>
        <select
          id="organization"
          name="organization"
          value={props.selectedOrganization}
          onChange={(e) => props.setSelectedOrganization(e.target.value)}
        >
          <option value="">Choose an organization</option>
          {Array.from(new Set(props.listDetails[3]?.map((item) => item.Organization_name))).map(
            (organization, index) => (
              <option key={index} value={organization}>
                {organization}
              </option>
            ))}
        </select>
        <br />
        {props.selectedOrganization && (
          <>
            <label htmlFor="specialty">Select a specialty: </label>
            <select
              id="specialty"
              name="specialty"
              value={props.selectedSpecialty?.specialties_listID || ""}
              onChange={event => handleSelectSpecialty(event, props.listDetails, props.setSelectedSpecialties)}
            >
              <option value="">Choose a specialty</option>
              {specialties
                .filter(
                  (specialty) =>
                    !props.doctorSpecialties.find(
                      (doctorSpecialty) =>
                        doctorSpecialty.specialties_listID === specialty.specialties_listID
                    )
                )
                .map((specialty) => (
                  <option key={specialty.specialties_listID} value={specialty.specialties_listID}>
                    {specialty.Specialty_name}
                  </option>
                ))}
            </select>
            <Button onClick={()=> handleAddSpecialty(props.selectedSpecialty, props.doctorSpecialties, props.setDoctorSpecialties, props.setSelectedSpecialties)}>Add</Button>
          </>
        )}
        <ul>
          {props.doctorSpecialties.map((specialty) => (
            <li key={specialty.specialties_listID}>
              {specialty.Organization_name} - {specialty.Specialty_name}{" "}
              <Button onClick={() => handleDeleteSpecialty(specialty, props.doctorSpecialties, props.setDoctorSpecialties)}>X</Button>
            </li>
          ))}
        </ul>
        <Button 
          variant = "success"
          onClick={() => saveSpecialies(props.doctorSpecialties, props.setShowSavedSpecialtiesMessage, props.setShowSameSpecialtiesMessage, props.setShowSaveSpecialtiesProblemMessage)}
          >
          Save</Button>
        <span className={`fade ${props.showSavedSpecialtiesMessage ? 'show' : ''}`}>Specialties saved!</span>
        <span className={`fade ${props.showSameSpecialtiesMessage ? 'show' : ''}`}>Same Specialty data!</span>
        <span className={`fade ${props.showSaveSpecialtiesProblemMessage ? 'show' : ''}`}>Problem Saving Specialty data!</span>
      </>
    )
  }else{
    return(
      <p>Loading...</p>
    )
  }
};
