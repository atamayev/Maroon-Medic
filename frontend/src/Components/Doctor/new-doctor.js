import React, { useState, useEffect, useContext } from 'react';
import {Card, Button, Form, Alert } from 'react-bootstrap'
import {Link, useLocation} from "react-router-dom";
import DataService from "../../Services/data-service.js"
import { VerifyContext } from '../../Wraps/VerifyContext.js';

export default function NewDoctor () {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [DOBmonth, setDOBmonth] = useState('');
  const [DOBday, setDOBday] = useState('');
  const [DOByear, setDOByear] = useState('');
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [DoctorID, setDoctorID] = useState(null);
  const location = useLocation();
  const {user_verification, verifyToken} = useContext(VerifyContext);
  const cookie_monster = document.cookie;

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
  const years = [...Array(100).keys()].map(i => i + new Date().getFullYear() - 100);
      
  useEffect(() => {
    user_verification(cookie_monster);
    DoctorUUIDtoDoctorID();
  }, [location, cookie_monster]);
  
  async function DoctorUUIDtoDoctorID (){
    if (cookie_monster){
      try{
        const response = await DataService.UUIDtoID(cookie_monster, 'Doctor')
        if (response.data === 'User does not exist'){
          return <p>Problem in DoctorUUID to DoctorID</p>
        }
        else{
          // console.log(response.data[0].Doctor_ID)
          setDoctorID(response.data[0].Doctor_ID)
        }
      }catch(error){
        console.log('error in DoctorUUID to DoctorID', error)
      }
    }else{
      console.log('elsed');
    }
  }

  if(!verifyToken){
    return(
     <Card>
        <Card.Body>
          <p>Please register first </p>;
          <Link to= {'/vet-register'}>
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
        const bool = await DataService.addingDoctorInfo(firstName, lastName, gender, DOBmonth, DOBday, DOByear, DoctorID)
        if(bool.data === true){
          // navigate("/dashboard");// this would be more efficient i think, but when navigate is used, the data doesn't load in time
          window.location.href = '/vet-dashboard';
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
        <Form.Group id = "DOB">

        <label>
        Month:
        <select required value={DOBmonth} onChange={e => setDOBmonth(e.target.value)}>
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
        <select required value={DOBday} onChange={e => setDOBday(e.target.value)}>
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
        <select required value={DOByear} onChange={e => setDOByear(e.target.value)}>
          <option value="" disabled>
            Select Year
          </option>
          {years.map(year => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </label>
     
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