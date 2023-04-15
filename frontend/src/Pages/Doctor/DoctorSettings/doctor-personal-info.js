import React, {useState, useEffect, useContext} from 'react'
import {Link} from "react-router-dom";
import {Card, Button, Form } from 'react-bootstrap'
import DoctorHeader from '../doctor-header.js';
import PrivateDoctorDataService from '../../../Services/private-doctor-data-service.js';
import { VerifyContext } from '../../../Contexts/VerifyContext.js';
import Header from '../../header.js';
import FormGroup from '../../../Components/form-group.js';

export default function DoctorPersonalInfo() {
  const [personalInfo, setPersonalInfo] = useState({});
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
              PersonalInfoData();
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

  async function PersonalInfoData(){
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

  const handleSave = async (e) =>{
      e.preventDefault();
      const storedPersonalInfoData = sessionStorage.getItem("DoctorPersonalInfo");
      const stringifiedPersonalInfoData = JSON.stringify(personalInfo)
      try{
          if (stringifiedPersonalInfoData !== storedPersonalInfoData){// if there is a change, and handlesave is used:
              try {
                  //create this:
                  const response = await PrivateDoctorDataService.savePersonalData(personalInfo);
                  if (response.data === true){
                      // setPersonalInfo(personalInfo);
                      sessionStorage.setItem("DoctorPersonalInfo", JSON.stringify(personalInfo));
                      console.log('Saved!');
                  }else{
                    console.log('no response')
                  }
              } catch (error) {
                  console.log(error.response.data);
              }
          }else{
              console.log('same data')
          }
      }catch(error){
          console.log('unable to handleSave', error)
      }
  };

  if(user_type === 'Patient'){
      return(
        <>
          <Header dropdown = {true} search = {true}/>
          <Card>
            <Card.Body>
            <p>Unautorized to view Doctor Dashboard </p>;
            <Link to= {'/patient-dashboard'}>
                  <Button variant="primary">
                      <p>Return to Patient Dashboard</p>
                  </Button>
            </Link>
            </Card.Body>
          </Card>
        </>

      )
    }
  
  if(user_type !== 'Doctor'){
    return(
      <>
        <Header dropdown = {true} search = {true}/>
        <Card>
          <Card.Body>
            <p>Please register or login first </p>;
            <Link to= {'/vet-register'}>
              <Button variant="primary">
                <p>Register</p>
              </Button>
            </Link>
            <Link to= {'/vet-login'}>
                    <Button variant="primary">
                        <p>Login</p>
                    </Button>
            </Link>
          </Card.Body>
        </Card>
      </>
    )
  }

  return (
    <div>
      <Header dropdown = {true}/>

      <DoctorHeader/>
      <Card>
          <Card.Body>
              <Form onSubmit = {handleSave}>
              <FormGroup
                id="FirstName"
                label="First Name"
                defaultValue={personalInfo.FirstName}
                onChange={(event) => setPersonalInfo({...personalInfo, FirstName: event.target.value})}
              />
              <FormGroup
                id="LastName"
                label="Last Name"
                defaultValue={personalInfo.LastName}
                onChange={(event) => setPersonalInfo({...personalInfo, LastName: event.target.value})}
              />
              <FormGroup
                id="Gender"
                label="Gender"
                defaultValue={personalInfo.Gender}
                onChange={(event) => setPersonalInfo({...personalInfo, Gender: event.target.value})}
              />
              <FormGroup
                id="DOB_month"
                label="Birthmonth"
                defaultValue={personalInfo.DOB_month}
                onChange={(event) => setPersonalInfo({...personalInfo, DOB_month: event.target.value})}
              />
              <FormGroup
                id="DOB_day"
                label="Birthday"
                defaultValue={personalInfo.DOB_day}
                onChange={(event) => setPersonalInfo({...personalInfo, DOB_day: event.target.value})}
              />
              <FormGroup
                id="DOB_year"
                label="Birthyear"
                defaultValue={personalInfo.DOB_year}
                onChange={(event) => setPersonalInfo({...personalInfo, DOB_year: event.target.value})}
              />
              <br/>
              <Button type = "submit" className="btn btn-primary w-100">Save</Button>
              </Form>
          </Card.Body>
      </Card>
    </div>
  )
};
