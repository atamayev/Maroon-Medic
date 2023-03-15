import React, { useState, useEffect, useContext } from 'react';
import {Card, Button, Form, Alert } from 'react-bootstrap'
import {useNavigate} from "react-router-dom";
import DataService from "../../Services/data-service.js"
import { VerifyContext } from '../../Contexts/VerifyContext.js';

export default function NewPatient () {
  const [newPatientInfo, setNewPatientInfo] = useState({});
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const {user_verification} = useContext(VerifyContext);
  const navigate = useNavigate();

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
  user_verification()
    .then(result => {
      if (result.verified === true && result.user_type === 'Patient') {
        DataService.newPatientConfirmation()
        .then(result => {
          if (result.data === "No new Patient nor UUID" ) {
            navigate('/');
          }else if (result.data === "UUID but not new Patient" || result.data === "Unverified") {
            navigate(`/patient-dashboard`);
          }else if (result.data === "New Patient but not UUID") {
            navigate('/patient-register');
          }else if (result.data === "New User"){
          }else{
            navigate('/patient-register');
          }
        })
      }
      else if (result.verified === true && result.user_type === 'Doctor') {
        navigate(`/vet-dashboard`);
      }else{
        navigate('/patient-register')
      }
    })
  }, []);
  
  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        setError("")
        setLoading(true)
        const bool = await DataService.addingPatientInfo(newPatientInfo)
        if(bool.data === true){
          // navigate("/dashboard");// this would be more efficient i think, but when navigate is used, the data doesn't load in time
          window.location.href = '/patient-dashboard';
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
            <Form.Control required type="text" value={newPatientInfo.FirstName} onChange={event => setNewPatientInfo({...newPatientInfo, FirstName: event.target.value})} />
        </Form.Group>
        <br />
        
        <Form.Group id = "lastname">
        <Form.Label>Last Name: </Form.Label>
          <Form.Control required type="text" value={newPatientInfo.LastName} onChange={event => setNewPatientInfo({...newPatientInfo, LastName: event.target.value})} />
        </Form.Group>
        <br />
        
        <Form.Group id = "gender">
        <Form.Label> Gender: </Form.Label>
          <select required value={newPatientInfo.Gender} onChange={event => setNewPatientInfo({...newPatientInfo, Gender: event.target.value})}>
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
        <select required defaultValue = "" value={newPatientInfo.DOB_month} onChange={event => setNewPatientInfo({...newPatientInfo, DOB_month: event.target.value})}>
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
        <select required defaultValue = "" value={newPatientInfo.DOB_day} onChange={event => setNewPatientInfo({...newPatientInfo, DOB_day: event.target.value})}>
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
        <select required defaultValue = "" value={newPatientInfo.DOB_year} onChange={event => setNewPatientInfo({...newPatientInfo, DOB_year: event.target.value})}>
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
        </Form.Group>
        <br />
        <Button type="submit" className = "w-100" disabled = {loading}>Submit</Button>
      </Form>
      </Card.Body>
    </Card>
  );
};
