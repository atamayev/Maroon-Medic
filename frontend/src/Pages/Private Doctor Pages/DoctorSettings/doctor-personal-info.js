import React, {useState, useEffect, useContext} from 'react'
import {Card, Button, Form } from 'react-bootstrap'
import DoctorHeader from '../doctor-header.js';
import PrivateDoctorDataService from '../../../Services/private-doctor-data-service.js';
import { VerifyContext } from '../../../Contexts/VerifyContext.js';
import Header from '../../header.js';
import FormGroup from '../../../Components/form-group.js';
import { NonDoctorAccess } from '../../../Components/user-type-unauth.js';
import { useConfirmationMessage } from '../../../Custom Hooks/Hooks for Doctor Account Details/useConfirmationMessage.js';

async function fetchPersonalInfoData(setPersonalInfo){
  try{
    const response = await PrivateDoctorDataService.fillPersonalData()
    if (response){
        setPersonalInfo(response.data);
        sessionStorage.setItem("DoctorPersonalInfo", JSON.stringify(response.data))
    }else{
      console.log('no response')
    }
  }catch(error){
    console.log('unable to fill PersonalInfoData', error)
  }
}

const handleSave = async (e, personalInfo, setPersonalInfoConfirmation) =>{
  e.preventDefault();
  const storedPersonalInfoData = sessionStorage.getItem("DoctorPersonalInfo");
  const stringifiedPersonalInfoData = JSON.stringify(personalInfo)
  try{
      if (stringifiedPersonalInfoData !== storedPersonalInfoData){// if there is a change, and handlesave is used:
          try {
              //create this:
              const response = await PrivateDoctorDataService.savePersonalData(personalInfo);
              if (response.status === 200){
                  // setPersonalInfo(personalInfo);
                  sessionStorage.setItem("DoctorPersonalInfo", JSON.stringify(personalInfo));
                  setPersonalInfoConfirmation({messageType: 'saved'});
              }else{
                console.log('no response')
              }
          } catch (error) {
            setPersonalInfoConfirmation({messageType: 'problem'});
              console.log(error.response.data);
          }
      }else{
        setPersonalInfoConfirmation({messageType: 'same'});
      }
  }catch(error){
    setPersonalInfoConfirmation({messageType: 'problem'});
      console.log('unable to handleSave', error)
  }
};

export default function DoctorPersonalInfo() {
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

  useEffect(()=>{
    user_verification()
    .then(result => {
      if (result.verified === true) {
        setUser_type(result.user_type)
        if(result.user_type === 'Doctor'){
          try{
            const storedPersonalInfoData = sessionStorage.getItem("DoctorPersonalInfo")
            if (storedPersonalInfoData){
                setPersonalInfo(JSON.parse(storedPersonalInfoData));
            }else{
              fetchPersonalInfoData(setPersonalInfo);
            }
          }catch(error){
            console.log(error)
          }
        }
      }
      else{
        console.log('Unverified')
      }
    })
    .catch(error => {
      console.error(error);
    });
  }, [])


  if(user_type !== 'Doctor'){
    return(
      <NonDoctorAccess/>
    )
  }

  return (
    <div>
      <Header dropdown = {true}/>
      <DoctorHeader/>
      <Card>
        <Card.Body>
            <Form onSubmit = {e => handleSave(e, personalInfo, setPersonalInfoConfirmation)}>
            <FormGroup
              id="FirstName"
              label="First Name"
              value={personalInfo.FirstName}
              onChange={(event) => setPersonalInfo({...personalInfo, FirstName: event.target.value})}
              required
            />
            <FormGroup
              id="LastName"
              label="Last Name"
              value={personalInfo.LastName}
              onChange={(event) => setPersonalInfo({...personalInfo, LastName: event.target.value})}
              required
            />
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

            <div className='row'>
              <Form.Group id = "DOB">
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
              </Form.Group>
            </div>
            <br/>
            <Button type = "submit" className="btn btn-primary w-100">Save</Button>
            <span className={`fade ${personalInfoConfirmation.messageType ? 'show' : ''}`}>
              {personalInfoConfirmation.messageType === 'saved' && 'Description saved!'}
              {personalInfoConfirmation.messageType === 'same' && 'Same Description data!'}
              {personalInfoConfirmation.messageType === 'problem' && 'Problem Saving Description!'}
            </span>
            </Form>
        </Card.Body>
      </Card>
    </div>
  );
};
