import React from "react";
import { Card, Button} from "react-bootstrap";
import { handleAddSpecialty } from "../../../Custom Hooks/Hooks for Account Details/add";
import { handleDeleteSpecialty } from "../../../Custom Hooks/Hooks for Account Details/delete";
import { useConfirmationMessage } from "../../../Custom Hooks/useConfirmationMessage";

export default function RenderSpecialtySection (props){
  return(
    <Card className="mb-3">
      <Card.Header>
          Specialties
      </Card.Header>
      <Card.Body>
        {RenderIsSpecialty(props)}
      </Card.Body>
    </Card>
  );
};

function RenderIsSpecialty(props){
  const [specialtiesConfirmation, setSpecialtiesConfirmation] = useConfirmationMessage();

  const specialties = props.selectedOrganization
  ? props.listDetails[2].filter((item) => item.Organization_name === props.selectedOrganization)
  : [];

  if(!Array.from(new Set(props.listDetails[2]?.map((item) => item.Organization_name))).length) return <p>Loading...</p>

  return(
    <>
      <label htmlFor="organization">Select an organization: </label>
      <select
        id="organization"
        name="organization"
        value={props.selectedOrganization}
        onChange={(e) => props.setSelectedOrganization(e.target.value)}
      >
        <option value = "" disabled>Choose an organization</option>
        {Array.from(new Set(props.listDetails[2]?.map((item) => item.Organization_name))).map(
          (organization, index) => (
            <option key = {index} value = {organization}>
              {organization}
            </option>
          ))}
      </select>
      <br />
      {props.selectedOrganization && (
        <>
          <label htmlFor = "specialty">Select a specialty: </label>
          <select
            id = "specialty"
            name = "specialty"
            value = {""}
            onChange = {(e) =>
              handleAddSpecialty(
                e.target.value,
                props.doctorSpecialties,
                props.setDoctorSpecialties,
                props.setSelectedOrganization,
                props.listDetails,
                setSpecialtiesConfirmation
              )
            }
          >
            <option value="" disabled>Choose a specialty</option>
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
        </>
      )}
      <ul>
        {props.doctorSpecialties.map((specialty) => (
          <li key={specialty.specialties_listID}>
            {specialty.Organization_name} - {specialty.Specialty_name}{" "}
            <Button 
              onClick = {() => 
                handleDeleteSpecialty(
                  specialty, 
                  props.doctorSpecialties, 
                  props.setDoctorSpecialties, 
                  props.setSelectedOrganization, 
                  setSpecialtiesConfirmation
                )}
            >X</Button>
          </li>
        ))}
      </ul>
        <span className={`fade ${specialtiesConfirmation.messageType ? 'show' : ''}`}>
        {specialtiesConfirmation.messageType === 'saved' && 'Specialties saved!'}
        {specialtiesConfirmation.messageType === 'same' && 'Same Specialty data!'}
        {specialtiesConfirmation.messageType === 'problem' && 'Problem Saving Specialties!'}
        {specialtiesConfirmation.messageType === 'none' && 'No specialties selected'}
      </span>
    </>
  )
};
