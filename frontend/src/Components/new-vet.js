import React, { useState, useEffect } from 'react';
import {Card, Button, Form, Alert } from 'react-bootstrap'
import {useNavigate, Link} from "react-router-dom";
import VetDataService from "../Services/vet-service.js";

export default function NewVet () {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [DOBmonth, setDOBmonth] = useState('');
  const [DOBday, setDOBday] = useState('');
  const [DOByear, setDOByear] = useState('');
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [verifyToken, setverifyToken] = useState(false) // wheather or not user verified
  const [DoctorID, setDoctorID] = useState(null);
  const navigate = useNavigate();
      
  useEffect(() => {
    user_verification();
    UUIDtoDoctorID();
  }, []);
  
  async function UUIDtoDoctorID (){
    const cookies = document.cookie;
    // console.log(cookies)
    if (cookies){
      try{
        const response = await VetDataService.UUIDtoDoctorID(cookies)
        if (response.data === 'User does not exist'){
          return <p>Problem in UUID to DoctorID</p>
        }
        else{
          // console.log(response.data[0].Doctor_ID)
          setDoctorID(response.data[0].Doctor_ID)
        }
      }catch(error){
        console.log('error in UUID to DoctorID', error)
      }
    }else{
      console.log('elsed');
    }
  }

  async function user_verification (){
    const cookies = document.cookie;
    if(cookies){
      const response = await VetDataService.verify(cookies)
      if(response.data.success === true){
        setverifyToken(true)
      }
      else{// if user not veriifed
        setverifyToken(false);
      }
    }
    else{// if no token received
      setverifyToken(false);
    }
  }

  if(!verifyToken){
    return(
     <Card>
        <Card.Body>
          <p>Please register first </p>;
          <Link to= {'/register'}>
              <Button variant="primary">
                  <p>Register</p>
              </Button>
        </Link>
      </Card.Body>
    </Card>
    )
  }

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        setError("")
        setLoading(true)
        const bool = await VetDataService.addingDoctorInfo(firstName, lastName, gender, DOBmonth, DOBday, DOByear, DoctorID)
        if(bool.data === true){
          // navigate("/new-vet-2");
          navigate(`/dashboard`)
          console.log('Data added');
        }
      } catch (err) {
        console.log('err in adding data 1',err)
        setError(err.response.data);
      }
      setLoading(false)
  }

  return (
    <Card>
      <Card.Body>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group id = "firstname">
          <Form.Label> First Name: </Form.Label>
              <Form.Control required type="text" value={firstName} onChange={e => setFirstName(e.target.value)} />
        </Form.Group>
        <br />
        
        <Form.Group id = "lastname">
        <Form.Label>Last Name: </Form.Label>
            <Form.Control required type="text" value={lastName} onChange={e => setLastName(e.target.value)} />
        </Form.Group>
        <br />
        
        <Form.Group id = "gender">
        <Form.Label> Gender: </Form.Label>
            <select required value={gender} onChange={e => setGender(e.target.value)}>
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
            </select>
        </Form.Group>
        <br />
        <Form.Group id = "gender">

        <Form.Label>Date of Birth:</Form.Label><br/>
            <select required value = {DOBmonth} onChange={e => setDOBmonth( e.target.value )}>
            {Array.from({length: 12}, (_, i) => (
            <option key={i + 1} value={i + 1}>{i + 1}</option>
          ))}  
            </select> 
            <select required value = {DOBmonth} onChange={e => setDOBday( e.target.value )}>
            {Array.from({length: 31}, (_, i) => (
            <option key={i + 1} value={i + 1}>{i + 1}</option>
          ))}  
            </select> 
            <select required value = {DOBmonth} onChange={e => setDOByear( e.target.value )}>
            {Array.from({length: 101}, (_, i) => (
            <option key={1900 + 1} value={1900 + 1}>{1900 + i}</option>
          ))}  
            </select> 
     
        {/*
        <Form.Control required type="text" placeholder="MM" value={DOBmonth} onChange={e => setDOBmonth( e.target.value )} pattern="[1-9]|1[0-2]" 
  onInput={(e) => {
    if (!e.target.validity.valid) {
      e.target.value = "";
    }
  }}/>
            <br />
            <Form.Control required type="text" placeholder="MM" value={DOBmonth} onChange={e => setDOBmonth( e.target.value )} /><br/> */}
            {/* <Form.Control required type="text" placeholder="DD" value={DOBday} onChange={e => setDOBday(e.target.value)} />
            <br />
            <Form.Control required type="text" placeholder="YYYY" value={DOByear} onChange={e => setDOByear(e.target.value)} /> */}
        </Form.Group>
        <br />
        {/* <Button type="submit" className = "w-100" >Submit</Button> */}
        {/* Bring this back when done testing - this is to ensure the button can't be pressed more than once */}
        <Button type="submit" className = "w-100" disabled = {loading}>Submit</Button>
      </Form>
      </Card.Body>
    </Card>
  );
};