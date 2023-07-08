import _ from "lodash"
import { useState, useCallback } from "react";
import { Card } from "react-bootstrap";
import { renderMessageSection } from "../../../components/saved-message-section";
import { handleAddSpecialty } from "../../../custom-hooks/account-details-hooks/add";
import { useConfirmationMessage } from "../../../custom-hooks/use-confirmation-message";
import { handleDeleteSpecialty } from "../../../custom-hooks/account-details-hooks/delete";
import { renderConfirmDeleteButton, renderInitialDeleteButton, renderNevermindButton } from "../../../components/delete-buttons";

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

  const handleSpecialtyChange = useCallback((e) => {
    handleAddSpecialty(
      e.target.value,
      doctorSpecialties,
      setDoctorSpecialties,
      setSelectedOrganization,
      listDetails,
      setSpecialtiesConfirmation
    )
  }, [doctorSpecialties, listDetails, setDoctorSpecialties, setSpecialtiesConfirmation]);

  const renderSelectSpecialty = () => {
    if (!selectedOrganization) return null

    return (
      <div>
        <label htmlFor = "specialty">Select a specialty: </label>
        <select
          id = "specialty"
          name = "specialty"
          value = {""}
          onChange = {(e) => handleSpecialtyChange(e)}
        >
          <option value = "" disabled>Choose a specialty</option>
          {renderShowSpecificSpecialties()}
        </select>
      </div>
    )
  }

  const handleDeleteOnClick = useCallback(
    (specialty) => {
      handleDeleteSpecialty(
        specialty,
        doctorSpecialties,
        setDoctorSpecialties,
        setSelectedOrganization,
        setSpecialtiesConfirmation
      )
    },
    [doctorSpecialties, setDoctorSpecialties, setSpecialtiesConfirmation]
  );

  const renderDeleteButtonOptions = (status, setStatus, specialty) => {
    return (
      <>
        {renderInitialDeleteButton(status, setStatus)}
        {renderNevermindButton(status, setStatus)}
        {renderConfirmDeleteButton(status, specialty, handleDeleteOnClick)}
      </>
    )
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

  if (_.isEmpty(_.uniq(listDetails.specialties?.map((item) => item.Organization_name)))) return <p>Loading...</p>

  return (
    <>
      {renderSelectOrganization()}
      {renderSelectSpecialty()}
      {renderShowSavedSpecialtyList()}
      {renderMessageSection(specialtiesConfirmation, 'Specialties')}
    </>
  )
};
