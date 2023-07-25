import _ from "lodash"
import { useState, useEffect, useMemo } from "react"
import { Card } from "react-bootstrap"
import { DeleteButtonOptions } from "../../../components/delete-buttons"
import { renderMessageSection } from "../../../components/saved-message-section"
import { useConfirmationMessage } from "../../../custom-hooks/use-confirmation-message"
import { useHandleAddSpecialty, useHandleDeleteSpecialty } from "../../../custom-hooks/account-details-hooks/callbacks"

export default function RenderSpecialtySection (props) {
  return (
    <Card className = "mb-3">
      <Card.Header>
        Specialties
      </Card.Header>
      <Card.Body>
        {RenderIsSpecialty(props)}
      </Card.Body>
    </Card>
  )
}

function RenderIsSpecialty(props) {
  const [selectedOrganization, setSelectedOrganization] = useState("")
  const [deleteStatuses, setDeleteStatuses] = useState({})
  const {listDetails, doctorSpecialties, setDoctorSpecialties} = props
  const [specialtiesConfirmation, setSpecialtiesConfirmation] = useConfirmationMessage()

  const specialties = selectedOrganization
    ? listDetails.specialties.filter((item) => item.Organization_name === selectedOrganization)
    : []

  useEffect(() => {
    const newDeleteStatuses = { ...deleteStatuses }

    // Go through each status
    for (const specialityListID in newDeleteStatuses) {
      // If the language ID does not exist in the spokenLanguages list, delete the status
      if (!doctorSpecialties.some((speciality) => speciality.speciality_listID === specialityListID)) {
        delete newDeleteStatuses[specialityListID]
      }
    }

    setDeleteStatuses(newDeleteStatuses)
  }, [doctorSpecialties])

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

  const specificSpecialtiesOptions = useMemo(() => {
    return specialties
      .filter((specialty) =>
        !doctorSpecialties.find(
          (doctorSpecialty) =>
            doctorSpecialty.specialties_listID === specialty.specialties_listID
        )
      )
      .map((specialty) => (
        <option key={specialty.specialties_listID} value={specialty.specialties_listID}>
          {specialty.Specialty_name}
        </option>
      ))
  }, [specialties, doctorSpecialties])

  const handleSpecialtyChange = useHandleAddSpecialty(doctorSpecialties, setDoctorSpecialties, setSelectedOrganization, listDetails, setSpecialtiesConfirmation)

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
          {specificSpecialtiesOptions}
        </select>
      </div>
    )
  }

  const handleDeleteSpecialty = useHandleDeleteSpecialty(doctorSpecialties, setDoctorSpecialties, setSpecialtiesConfirmation)

  const RenderSingleSavedSpecialty = (specialty) => {
    const status = deleteStatuses[specialty.specialties_listID] || "initial"

    const setStatus = (newStatus) => {
      setDeleteStatuses((prevStatuses) => ({
        ...prevStatuses,
        [specialty.specialties_listID]: newStatus,
      }))
    }

    return (
      <li>
        {specialty.Organization_name} - {specialty.Specialty_name}{" "}
        <DeleteButtonOptions
          status = {status}
          setStatus = {setStatus}
          dataType = {specialty}
          handleDeleteOnClick = {handleDeleteSpecialty}
        />
      </li>
    )
  }

  const renderSavedSpecialtyList = () => {
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
      {renderSavedSpecialtyList()}
      {renderMessageSection(specialtiesConfirmation, "Specialties")}
    </>
  )
}