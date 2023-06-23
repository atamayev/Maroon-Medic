import React, {useState, useEffect, useContext} from 'react'
import {Card, Button, Form } from 'react-bootstrap'
import { VerifyContext } from '../../../contexts/verify-context.js';
import { NonPatientAccess } from '../../../components/user-type-unauth.js';
import { invalidUserAction } from '../../../custom-hooks/user-verification-snippets.js';
import PrivatePatientDataService from '../../../services/private-patient-data-service.js';
import { useConfirmationMessage } from '../../../custom-hooks/use-confirmation-message.js';
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

export default function PatientPersonalInfo() {
  const [personalInfo, setPersonalInfo] = useState({});
  const [personalInfoConfirmation, setPersonalInfoConfirmation] = useConfirmationMessage();
  const {userVerification} = useContext(VerifyContext)
  const [userType, setUserType] = useState(null);

  const verifyAndSetPersonalInfo = async () => {
    const result = await userVerification();
    if (result.verified === true) {
      setUserType(result.userType)
      if (result.userType === 'Patient') {
        try {
          const storedPersonalInfoData = sessionStorage.getItem("PatientPersonalInfo")
          if (storedPersonalInfoData) setPersonalInfo(JSON.parse(storedPersonalInfoData));
          else fetchPersonalInfoData(setPersonalInfo);
        } catch(error) {
        }
      }
    }
  };

  useEffect(() => {
    verifyAndSetPersonalInfo()
  }, [])

  if (userType !== 'Patient') return <NonPatientAccess/>

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
