import { useState, useEffect } from 'react'
import { Card, Button, Form } from 'react-bootstrap'
import { NonPatientAccess } from '../../../components/user-type-unauth.js';
import { invalidUserAction } from '../../../custom-hooks/user-verification-snippets.js';
import PrivatePatientDataService from '../../../services/private-patient-data-service.js';
import { useConfirmationMessage } from '../../../custom-hooks/use-confirmation-message.js';
import useSimpleUserVerification from '../../../custom-hooks/use-simple-user-verification.js';
import { renderFirstNameSection, renderLastNameSection, renderDOBSection, renderGenderSection, renderMessageSection } from '../../../components/personal-info-inputs.js';
import Header from '../../header.js';
import PatientHeader from '../patient-header.js';

async function fetchPersonalInfoData(setPersonalInfo) {
  try {
    const response = await PrivatePatientDataService.fillPersonalData()
    if (response) {
      setPersonalInfo(response.data);
      sessionStorage.setItem("PatientPersonalInfo", JSON.stringify(response.data))
    }
  } catch(error) {
    if (error.response.status === 401) invalidUserAction(error.response.data)
  }
}

const handleSave = async (e, personalInfo, setPersonalInfoConfirmation) => {
  e.preventDefault();
  const storedPersonalInfoData = sessionStorage.getItem("PatientPersonalInfo");
  const stringifiedPersonalInfoData = JSON.stringify(personalInfo)
  try {
    if (stringifiedPersonalInfoData !== storedPersonalInfoData) {// if there is a change, and handlesave is used:
      try {
        const response = await PrivatePatientDataService.savePersonalData(personalInfo);
        if (response.status === 200) {
          sessionStorage.setItem("PatientPersonalInfo", JSON.stringify(personalInfo));
          setPersonalInfoConfirmation({messageType: 'saved'});
        }
      } catch (error) {
        if (error.response.status === 401) invalidUserAction(error.response.data)
        else setPersonalInfoConfirmation({messageType: 'problem'});
      }
    } else {
      setPersonalInfoConfirmation({messageType: 'same'});
    }
  } catch(error) {
    setPersonalInfoConfirmation({messageType: 'problem'});
  }
};

function usePersonalInfo(userType) {
  const [personalInfo, setPersonalInfo] = useState({});

  const fetchAndSetPersonalInfo = async () => {
    if (userType === 'Patient') {
      try {
        const storedPersonalInfoData = sessionStorage.getItem("PatientPersonalInfo")
        if (storedPersonalInfoData) setPersonalInfo(JSON.parse(storedPersonalInfoData));
        else fetchPersonalInfoData(setPersonalInfo);
      } catch(error) {
      }
    }
  };

  useEffect(() => {
    fetchAndSetPersonalInfo()
  }, [userType]);

  return {personalInfo, setPersonalInfo};
}

export default function PatientPersonalInfo() {
  const { userType } = useSimpleUserVerification();
  const {personalInfo, setPersonalInfo} = usePersonalInfo(userType);
  const [personalInfoConfirmation, setPersonalInfoConfirmation] = useConfirmationMessage();

  if (userType !== 'Patient') return <NonPatientAccess/>;

  return (
    <div>
      <Header dropdown = {true} search = {true}/>
      <PatientHeader/>
      <Card>
        <Card.Body>
          <Form onSubmit = {e => handleSave(e, personalInfo, setPersonalInfoConfirmation)}>
            {renderFirstNameSection(personalInfo, setPersonalInfo)}
            {renderLastNameSection(personalInfo, setPersonalInfo)}
            {renderGenderSection(personalInfo, setPersonalInfo)}
            {renderDOBSection(personalInfo, setPersonalInfo)}
            <Button type = "submit" className = "btn btn-primary w-100">Save</Button>
            {renderMessageSection(personalInfoConfirmation)}
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};
