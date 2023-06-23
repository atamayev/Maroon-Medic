import React, {useState, useEffect, useContext} from 'react'
import {Card, Button, Form } from 'react-bootstrap'
import FormGroup from '../../../components/form-group.js';
import { VerifyContext } from '../../../contexts/verify-context.js';
import { NonPatientAccess } from '../../../components/user-type-unauth.js';
import PrivatePatientDataService from '../../../services/private-patient-data-service.js';
import { useConfirmationMessage } from '../../../custom-hooks/use-confirmation-message.js';
import { invalidUserAction } from '../../../custom-hooks/user-verification-snippets.js';
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

  const {user_verification} = useContext(VerifyContext)
  const [user_type, setUser_type] = useState(null);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  
  const days = [...Array(31).keys()].map(i => i + 1);
  const currentYear = new Date().getFullYear();
  const years = Array.from({length: 63}, (_, i) => currentYear - i - 18); // Renders an array from 18 years ago to 63 minus that year.  

  const verifyAndSetPersonalInfo = async () => {
    const result = await user_verification();
    if (result.verified === true) {
      setUser_type(result.user_type)
      if (result.user_type === 'Patient') {
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

  if (user_type !== 'Patient') return <NonPatientAccess/>

  const renderFirstNameSection = () => {
    return (
      <FormGroup
        id = "FirstName"
        label = "First Name"
        onChange = {event => setPersonalInfo({...personalInfo, FirstName: event.target.value})}
        pattern = "[A-Za-z]*"
        placeholder= "First Name"
        required
        type = "text"
        value = {personalInfo.FirstName}
      />
    )
  }

  const renderLastNameSection = () => {
    return (
      <FormGroup
        id="LastName"
        label="Last Name"
        onChange={event => setPersonalInfo({...personalInfo, LastName: event.target.value})}
        pattern={"[A-Za-z]*"}
        placeholder={"Last Name"}
        required
        type = {"text"}
        value={personalInfo.LastName}
      />
    )
  }

  const renderGenderSection = () => {
    return (
      <FormGroup
        as="select"
        id="Gender"
        label="Gender:"
        required={true}
        value={personalInfo.Gender}
        onChange={(event) => setPersonalInfo({...personalInfo, Gender: event.target.value})}
      >
        <option value="" disabled>Select</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </FormGroup>
    )
  }

  const renderSelectMonth = () => {
    return (
      <>
        <label>
          Month:
          <select required defaultValue = "" value ={personalInfo.DOB_month} onChange={(event) => setPersonalInfo({...personalInfo, DOB_month: event.target.value})}>
            <option value="" disabled>
              Select Month
            </option>
            {months.map(month => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </label>
      </>
    )
  }

  const renderSelectDay = () => {
    return (
      <>
        <label>
          Day:
          <select required defaultValue = "" value={personalInfo.DOB_day} onChange={(event) => setPersonalInfo({...personalInfo, DOB_day: event.target.value})}>
            <option value="" disabled>
              Select Day
            </option>
            {days.map(day => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </label>
      </>
    )
  }

  const renderSelectYear = () => {
    return (
      <>
        <label>
          Year:
          <select required defaultValue = "" value={personalInfo.DOB_year} onChange={(event) => setPersonalInfo({...personalInfo, DOB_year: event.target.value})}>
            <option value="" disabled>
              Select Year
            </option>
            {years.map(year => (
              <option key={year + 1} value={year + 1}>
                {year + 1}
              </option>
            ))}
          </select>
        </label>
      </>
    )
  }

  const renderDOBSection = () => {
    return (
      <div className='row mt-3 mb-3'>
        <Form.Group id = "DOB">
          {renderSelectMonth()}
          {renderSelectDay()}
          {renderSelectYear()}
        </Form.Group>
      </div>
    )
  }

  const renderMessageSection = () => {
    return (
      <span className={`fade ${personalInfoConfirmation.messageType ? 'show' : ''}`}>
        {personalInfoConfirmation.messageType === 'saved' && 'Personal data saved'}
        {personalInfoConfirmation.messageType === 'same' && 'Same Personal data!'}
        {personalInfoConfirmation.messageType === 'problem' && 'Problem Saving Personal data!'}
      </span>
    )
  }

  return (
    <div>
      <Header dropdown = {true} search = {true}/>
      <PatientHeader/>
      <Card>
        <Card.Body>
          <Form onSubmit = {e => handleSave(e, personalInfo, setPersonalInfoConfirmation)}>
            {renderFirstNameSection()}
            {renderLastNameSection()}
            {renderGenderSection()}
            {renderDOBSection()}
            <Button type = "submit" className="btn btn-primary w-100">Save</Button>
            {renderMessageSection()}
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};
