import _ from "lodash"
import { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { handleAddSpecialty } from "../../../custom-hooks/account-details-hooks/add";
import { useConfirmationMessage } from "../../../custom-hooks/use-confirmation-message";
import { handleDeleteSpecialty } from "../../../custom-hooks/account-details-hooks/delete";
import { renderMessageSection } from "../../../components/saved-message-section";

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
  const [selectedOrganization, setSelectedOrganization] = useState('');
  const {listDetails, doctorSpecialties, setDoctorSpecialties} = props;
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
          {_.uniq(listDetails.specialties?.map((item) => item.Organization_name)).map(
            (organization) => (
              <option key = {organization} value = {organization}>
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
    if (!selectedOrganization) return null

    return (
      <div>
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
      </div>
    )
  }

  const renderNevermindButton = (status, setStatus) => {
    if (status !== 'deleting') return null

    return (
      <Button
        variant = "secondary"
        onClick = {() => setStatus('initial')}
      >
        Nevermind
      </Button>
    )
  }

  const renderConfirmDeleteButton = (status, specialty) => {
    if (status !== 'deleting') return null

    return (
      <Button
        variant = "danger"
        onClick = {() =>
          handleDeleteSpecialty(
            specialty,
            doctorSpecialties,
            setDoctorSpecialties,
            setSelectedOrganization,
            setSpecialtiesConfirmation
          )}
      >
        Confirm Delete
      </Button>
    )
  }

  const renderInitialDeleteButton = (setStatus) => {
    return (
      <Button
        variant = "danger"
        onClick = {() => setStatus('deleting')}
      >
        X
      </Button>
    )
  }

  const renderDeleteButtonOptions = (status, setStatus, specialty) => {
    if (status === 'initial') return renderInitialDeleteButton(setStatus)

    else if (status === 'deleting') {
      return (
        <>
          {renderNevermindButton(status, setStatus)}
          {renderConfirmDeleteButton(status, specialty)}
        </>
      )
    }
  }

  const RenderSingleSavedSpecialty = (specialty) => {
    const [status, setStatus] = useState('initial');
    return (
      <li>
        {specialty.Organization_name} - {specialty.Specialty_name}{" "}
        {renderDeleteButtonOptions(status, setStatus, specialty)}
      </li>
    )
  }

  const renderShowSavedSpecialtyList = () => {
    return (
      <ul>
        {doctorSpecialties.map((specialty) => (
          <RenderSingleSavedSpecialty
            key = {specialty.specialties_listID}
            {...specialty}
          />
        ))}
      </ul>
    )
  }

  return (
    <>
      {renderSelectOrganization()}
      {renderSelectSpecialty()}
      {renderShowSavedSpecialtyList()}
      {renderMessageSection(specialtiesConfirmation, 'Specialties')}
    </>
  )
};
