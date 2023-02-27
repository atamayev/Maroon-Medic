import React, {useState, useEffect, useContext} from 'react'
import {Link} from "react-router-dom";
import {Card, Button, Form } from 'react-bootstrap'
import DoctorHeader from '../doctor-header.js';
import DataService from '../../../Services/data-service.js';
import { VerifyContext } from '../../../Contexts/VerifyContext.js';

export default function DoctorPersonalInfo() {
    const [personalInfo, setPersonalInfo] = useState({});
    const {user_verification} = useContext(VerifyContext)
    const [user_type, setUser_type] = useState(null);

    useEffect(()=>{
        console.log("in DoctorPersonalInfo useEffect");
        user_verification()
        .then(result => {
          if (result.verified === true && result.DoctorToken) {
            setUser_type('Doctor')
            console.log(`Used ${DoctorPersonalInfo.name} useEffect`);
            const storedPersonalInfoData = sessionStorage.getItem("DoctorPersonalInfo")
            if (storedPersonalInfoData){
                setPersonalInfo(JSON.parse(storedPersonalInfoData));
            }else{
              console.log('fetching data from db (elsed)')
              PersonalInfoData();
            }
          }
          else if (result.verified === true && result.PatientToken){
            setUser_type('Patient')
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
        console.log('in personal data')
        try{
            const response = await DataService.fillDoctorPersonalData()
            console.log(response.data)
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
                    const response = await DataService.saveDoctorPersonalData(personalInfo);
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
        )
      }
    
    if(user_type !== 'Doctor'){
        return(
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
        )
    }

  return (
    <div>
        <DoctorHeader/>
        <Card>
            <Card.Body>
                <Form onSubmit = {handleSave}>
                {/* Conisder adding DOB, Gender as a field to this */}
                <Form.Group id = "FirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control id="FirstName" defaultValue={personalInfo.FirstName} onChange={(event) => setPersonalInfo({...personalInfo, FirstName: event.target.value})}/>
                </Form.Group>

                <Form.Group id = "LastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control id="LastName" defaultValue={personalInfo.LastName} onChange={(event) => setPersonalInfo({...personalInfo, LastName: event.target.value})}/>
                </Form.Group>

                <Form.Group id = "Gender">
                    <Form.Label>Gender</Form.Label>
                    <Form.Control id="Gender" defaultValue={personalInfo.Gender} onChange={(event) => setPersonalInfo({...personalInfo, Gender: event.target.value})}/>
                </Form.Group>

                <Form.Group id = "DOB_month">
                    <Form.Label>Birthmonth</Form.Label>
                    <Form.Control id="DOB_month" defaultValue={personalInfo.DOB_month} onChange={(event) => setPersonalInfo({...personalInfo, DOB_month: event.target.value})}/>
                </Form.Group>

                <Form.Group id = "DOB_day">
                    <Form.Label>Birthday</Form.Label>
                    <Form.Control id="DOB_day" defaultValue={personalInfo.DOB_day} onChange={(event) => setPersonalInfo({...personalInfo, DOB_day: event.target.value})}/>
                </Form.Group>

                <Form.Group id = "DOB_year">
                    <Form.Label>Birthyear</Form.Label>
                    <Form.Control id="DOB_year" defaultValue={personalInfo.DOB_year} onChange={(event) => setPersonalInfo({...personalInfo, DOB_year: event.target.value})}/>
                </Form.Group>

                {/* <Form.Group id = "phone">
                    <Form.Label>Personal Phone Number</Form.Label>
                    <Form.Control id="phone" defaultValue={personalInfo.phone} onChange={(event) => setPersonalInfo({...PersonalInfoData, phone: event.target.value})}/>
                </Form.Group> */}

                <br/>
                <Button type = "submit" className="btn btn-primary w-100">Save</Button>
                </Form>
            </Card.Body>
        </Card>
    </div>
  )
};
