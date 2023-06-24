import _ from "lodash"
import { Card, Button } from "react-bootstrap";
import { handleAddSpecialty } from "../../../custom-hooks/account-details-hooks/add";
import { useConfirmationMessage } from "../../../custom-hooks/use-confirmation-message";
import { handleDeleteSpecialty } from "../../../custom-hooks/account-details-hooks/delete";

export default function RenderSpecialtySection (props) {
  return(
    <Card className = "mb-3">
      <Card.Header>
          Specialties
      </Card.Header>
      <Card.Body>
        {RenderIsSpecialty(props)}
      </Card.Body>
    </Card>
  );
};

function RenderIsSpecialty(props) {
  const {listDetails, selectedOrganization, setSelectedOrganization, doctorSpecialties, setDoctorSpecialties} = props;
  const [specialtiesConfirmation, setSpecialtiesConfirmation] = useConfirmationMessage();

  const specialties = selectedOrganization
  ? listDetails.specialties.filter((item) => item.Organization_name === selectedOrganization)
  : [];

  if (_.isEmpty(_.uniq(listDetails.specialties?.map((item) => item.Organization_name)))) return <p>Loading...</p>

  const renderSelectOrganization = () => {
    return (
      <div>
        <label htmlFor = "organization">Select an organization: </label>
        <select
          id = "organization"
          name = "organization"
          value = {selectedOrganization}
          onChange = {(e) => setSelectedOrganization(e.target.value)}
          >
          <option value = "" disabled>Choose an organization</option>
          {Array.from(new Set(listDetails.specialties?.map((item) => item.Organization_name))).map(
            (organization, index) => (
              <option key = {index} value = {organization}>
                {organization}
              </option>
            ))}
        </select>
      </div>
    )
  }

  const renderShowSpecificSpecialties = () => {
    return (
      <>
        {specialties
          .filter(
            (specialty) =>
            !doctorSpecialties.find(
              (doctorSpecialty) =>
              doctorSpecialty.specialties_listID === specialty.specialties_listID
              )
              )
              .map((specialty) => (
                <option key = {specialty.specialties_listID} value = {specialty.specialties_listID}>
              {specialty.Specialty_name}
            </option>
          ))}
      </>
    )
  }

  const renderSelectSpecialty = () => {
    return (
      <div>
        {selectedOrganization && (
          <>
            <label htmlFor = "specialty">Select a specialty: </label>
            <select
              id = "specialty"
              name = "specialty"
              value = {""}
              onChange = {(e) =>
                handleAddSpecialty(
                  e.target.value,
                  doctorSpecialties,
                  setDoctorSpecialties,
                  setSelectedOrganization,
                  listDetails,
                  setSpecialtiesConfirmation
                  )
                }
                >
              <option value = "" disabled>Choose a specialty</option>
              {renderShowSpecificSpecialties()}
            </select>
          </>
        )}
      </div>
    )
  }

  const renderShowSavedSpecialties = () => {
    return (
      <ul>
        {doctorSpecialties.map((specialty) => (
          <li key = {specialty.specialties_listID}>
            {specialty.Organization_name} - {specialty.Specialty_name}{" "}
            <Button 
              onClick = {() => 
                handleDeleteSpecialty(
                  specialty, 
                  doctorSpecialties, 
                  setDoctorSpecialties, 
                  setSelectedOrganization, 
                  setSpecialtiesConfirmation
                )}
            >X</Button>
          </li>
        ))}
      </ul>
    )
  }

  const renderMessageSection = () => {
    return (
      <span className = {`fade ${specialtiesConfirmation.messageType ? 'show' : ''}`}>
        {specialtiesConfirmation.messageType === 'saved' && 'Specialties saved!'}
        {specialtiesConfirmation.messageType === 'same' && 'Same Specialty data!'}
        {specialtiesConfirmation.messageType === 'problem' && 'Problem Saving Specialties!'}
        {specialtiesConfirmation.messageType === 'none' && 'No specialties selected'}
      </span>
    )
  }

  return (
    <>
      {renderSelectOrganization()}
      {renderSelectSpecialty()}
      {renderShowSavedSpecialties()}
      {renderMessageSection()}
    </>
  )
};
