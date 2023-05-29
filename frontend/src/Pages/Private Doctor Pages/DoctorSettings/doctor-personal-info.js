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
              defaultValue={personalInfo.FirstName}
              onChange={(event) => setPersonalInfo({...personalInfo, FirstName: event.target.value})}
              required
            />
            <FormGroup
              id="LastName"
              label="Last Name"
              defaultValue={personalInfo.LastName}
              onChange={(event) => setPersonalInfo({...personalInfo, LastName: event.target.value})}
              required
            />
            <FormGroup
              id="Gender"
              label="Gender"
              defaultValue={personalInfo.Gender}
              onChange={(event) => setPersonalInfo({...personalInfo, Gender: event.target.value})}
              required
            />
            <div className='row'>
              <div className='col-md-4'>
                <FormGroup
                  id="DOB_month"
                  label="Birthmonth"
                  defaultValue={personalInfo.DOB_month}
                  onChange={(event) => setPersonalInfo({...personalInfo, DOB_month: event.target.value})}
                  required
                />
              </div>
              <div className='col-md-4'>
                <FormGroup
                  id="DOB_day"
                  label="Birthday"
                  defaultValue={personalInfo.DOB_day}
                  onChange={(event) => setPersonalInfo({...personalInfo, DOB_day: event.target.value})}
                  required
                />
              </div>
              <div className='col-md-4'>
                <FormGroup
                  id="DOB_year"
                  label="Birthyear"
                  defaultValue={personalInfo.DOB_year}
                  onChange={(event) => setPersonalInfo({...personalInfo, DOB_year: event.target.value})}
                  required
                />
              </div>
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
