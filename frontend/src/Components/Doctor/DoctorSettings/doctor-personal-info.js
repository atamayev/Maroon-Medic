import React, {useState, useEffect, useContext} from 'react'
import {Link} from "react-router-dom";
import {Card, Button, Form } from 'react-bootstrap'
import DoctorHeader from '../doctor-header.js';
import DataService from '../../../Services/data-service.js';
import { VerifyContext } from '../../../Contexts/VerifyContext.js';

export default function DoctorPersonalInfo() {
    const [personalInfo, setPersonalInfo] = useState({});
    const {DoctorVerifyToken, PatientVerifyToken, user_verification} = useContext(VerifyContext)

    useEffect(()=>{
        console.log("in DoctorPersonalInfo useEffect");
        user_verification()
        .then(result => {
          if (result === true) {
            console.log(`Used ${DoctorPersonalInfo.name} useEffect`);
            const storedPersonalInfoData = sessionStorage.getItem("DoctorPersonalInfo")
            if (storedPersonalInfoData){
                setPersonalInfo(JSON.parse(storedPersonalInfoData));
            }else{
              console.log('fetching data from db (elsed)')
              PersonalInfoData();
            }
          }
        })
        .catch(error => {
          console.error(error);
        });
    }, [])

    async function PersonalInfoData(){
        console.log('in personal data')
        try{
            //need to make this fucntion:
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
        const storedPersonalInfoData = sessionStorage.getItem("DoctorPersonalInfo")
        try{
            if (personalInfo != storedPersonalInfoData){// if there is a change, and handlesave is used:
                try {
                    //create this:
                    await DataService.savePersonalData(personalInfo);
                    console.log('Updated Informtion');
                } catch (error) {
                    console.log(error.response.data);
                }
            }else{
                console.log('personalInfo',personalInfo)
                console.log('storedPersonalInfoData',storedPersonalInfoData)
                console.log('same data')
            }
        }catch(error){
            console.log('unable to handleSave', error)
        }
    };

    if(PatientVerifyToken){
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
    
    if(!DoctorVerifyToken){
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

                <Form.Group id = "firstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control id="firstName" defaultValue={personalInfo.FirstName} onChange={(event) => setPersonalInfo({...PersonalInfoData, firstName: event.target.value})}/>
                </Form.Group>

                <Form.Group id = "lastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control id="lastName" defaultValue={personalInfo.LastName} onChange={(event) => setPersonalInfo({...PersonalInfoData, lastName: event.target.value})}/>
                </Form.Group>

                <Form.Group id = "email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control id="email" defaultValue={personalInfo.email} onChange={(event) => setPersonalInfo({...PersonalInfoData, email: event.target.value})}/>
                </Form.Group>

                <Form.Group id = "phone">
                    <Form.Label>Personal Phone Number</Form.Label>
                    <Form.Control id="phone" defaultValue={personalInfo.phone} onChange={(event) => setPersonalInfo({...PersonalInfoData, phone: event.target.value})}/>
                </Form.Group>
                <br/>
                <Button type = "submit" className="btn btn-primary w-100">Save</Button>
                </Form>
            </Card.Body>
        </Card>
    </div>
  )
};
