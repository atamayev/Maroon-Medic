import _ from "lodash"
import { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { DeleteButtonOptions } from "../../../components/delete-buttons";
import { renderMessageSection } from "../../../components/saved-message-section";
import { useConfirmationMessage } from "../../../custom-hooks/use-confirmation-message";
import { useHandleDeleteVetEducation, useSaveAddVetEducation, useHandleAddVetEducation } from "../../../custom-hooks/account-details-hooks/callbacks";
import EducationTime from "./education-time";

export default function RenderVetEducationSection (props) {
  return(
    <Card className = "mb-3">
      <Card.Header>
        Vet Education
      </Card.Header>
      <Card.Body>
        {RenderIsVetEducation(props)}
      </Card.Body>
  </Card>
  );
};

function RenderIsVetEducation(props) {
  const { listDetails, vetEducation, setVetEducation } = props;
  const [selectedVetSchool, setSelectedVetSchool] = useState("");
  const [deleteStatuses, setDeleteStatuses] = useState({});
  const [selectedVetEducationType, setSelectedVetEducationType] = useState("");
  const [timeState, setTimeState] = useState({
    startMonth: "",
    endMonth: "",
    startYear: "",
    endYear: "",
  });
  const [vetEducationConfirmation, setVetEducationConfirmation] = useConfirmationMessage();

  const allChoicesFilled = selectedVetSchool && selectedVetEducationType &&
    timeState.startMonth && timeState.endMonth && timeState.startYear && timeState.endYear;

  useEffect(() => {
    const newDeleteStatuses = { ...deleteStatuses };

    // Go through each status
    for (const vet_education_mappingID in newDeleteStatuses) {
      // If the language ID does not exist in the vetEducation list, delete the status
      if (!vetEducation.some((vet_education) => vet_education.vet_education_mappingID === vet_education_mappingID)) {
        delete newDeleteStatuses[vet_education_mappingID];
      }
    }

    setDeleteStatuses(newDeleteStatuses);
  }, [vetEducation]);

  const renderSelectSchool = () => {
    return (
      <div>
        <label htmlFor = "vet-school">Select a Veterinary School: </label>
        <select
          id = "vet-school"
          name = "vet-school"
          value = {selectedVetSchool}
          onChange = {(e) => setSelectedVetSchool(e.target.value)}
        >
          <option value = "" disabled>Choose a School</option>
          {_.uniqBy(listDetails.vetSchools, "School_name").map(
              (school) => (
                <option key = {school.vet_school_listID} value = {school.School_name}>
                  {school.School_name}
                </option>
              )
          )}
        </select>
      </div>
    )
  }

  const renderSelectEducationType = () => {
    if (!selectedVetSchool) return null;
    return (
      <div>
        <label htmlFor = "education-type">Select a Type of Veterinary Education: </label>
        <select
          id = "vet-education"
          name = "vet-education"
          value = {selectedVetEducationType}
          onChange = {(event) => setSelectedVetEducationType(event.target.value)}
        >
          <option value = "" disabled>Choose an Education Type</option>
          {_.uniqBy(listDetails.vetEducationTypes, "Education_type").map(
            (vetEdType) => (
              <option key = {vetEdType.vet_education_typeID} value = {vetEdType.Education_type}>
                {vetEdType.Education_type}
              </option>
            )
          )}
        </select>
      </div>
    )
  }

  const renderEducationTime = () => {
    if (!selectedVetEducationType) return null;
    return (
      <EducationTime
        timeState = {timeState}
        setTimeState = {setTimeState}
      />
    )
  }

  const handleAddEducation = useHandleAddVetEducation(
    selectedVetSchool, setSelectedVetSchool,
    selectedVetEducationType, setSelectedVetEducationType,
    timeState,setTimeState
  );

  const saveVetEducation = useSaveAddVetEducation(
    vetEducation, setVetEducation,
    listDetails, setVetEducationConfirmation
  );

  const renderAddAndSaveButton = () => {
    if (!allChoicesFilled) return null;
    return (
      <Button
        onClick = {() => {
          const selectedEducationObj = handleAddEducation();
          saveVetEducation(selectedEducationObj);
        }}
      >
        Add
      </Button>
    );
  };

  const handleDeleteOnClick = useHandleDeleteVetEducation(vetEducation, setVetEducation, listDetails, setVetEducationConfirmation)

  const RenderSingleSavedEducation = (vet_education) => {
    const status = deleteStatuses[vet_education.vet_education_mappingID] || "initial";

    const setStatus = (newStatus) => {
      setDeleteStatuses((prevStatuses) => ({
        ...prevStatuses,
        [vet_education.vet_education_mappingID]: newStatus,
      }));
    };

    return (
      <li>
        {vet_education.School_name}, {vet_education.Education_type}
          {" (" + vet_education.Start_Date} - {vet_education.End_Date + ") "}
        <DeleteButtonOptions
          status = {status}
          setStatus = {setStatus}
          dataType = {vet_education}
          handleDeleteOnClick = {handleDeleteOnClick}
        />
      </li>
    )
  }

  const renderSavedEducationList = () => {
    return (
      <ul>
        {vetEducation.map((vet_education) => (
          <RenderSingleSavedEducation
            key = {vet_education.vet_education_mappingID}
            {...vet_education}
          />
        ))}
      </ul>
    )
  }

  if (_.isEmpty(_.uniq(listDetails.vetSchools?.map((item) => item.School_name)))) return <p>Loading...</p>

  return (
    <>
      {renderSelectSchool()}

      {renderSelectEducationType()}

      {renderEducationTime()}

      {renderAddAndSaveButton()}

      {renderSavedEducationList()}

      {renderMessageSection(vetEducationConfirmation, "Vet Education")}
    </>
  )
};
