import React, { useState, useEffect, useContext } from 'react';
import {Card, Button, Form, Alert } from 'react-bootstrap'
import {Link, useNavigate} from "react-router-dom";
import DataService from "../../Services/data-service.js"
import { VerifyContext } from '../../Contexts/VerifyContext.js';

export default function NewDoctor () {
  const [newDoctorInfo, setNewDoctorInfo] = useState({});
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
    // should have a check for special cookie function (UUID-like), to ensure that users with existing accounts cannot re-enter data
    // Here, there should be some function that checks if the user is a new user or not.
    // If the user is new, allow them to use the page. if not, navigate them to their dashboard page
    user_verification()
      .then(result => {
        if (result.verified === true && result.DoctorToken) {
          DataService.newDoctorConfirmation()
            .then(result => {
              if (result.data === "No new Doctor nor UUID") {
                navigate('/');
              }else if (result.data === "UUID but not new Doctor") {
                navigate(`/vet-dashboard`);
              }else if (result.data === "New Doctor but not UUID") {
                navigate('/vet-register');
              }else if (result.data === "New User"){
              }
            })
        }
        else if (result.verified === true && result.PatientToken) {
          navigate('/patient-dashboard');
        }else{
          navigate('/vet-register');
        }
      })
  }, []);
  
  async function DoctorUUIDtoDoctorID (){
    try{
      const response = await DataService.UUIDtoID()
      if (response.data === 'Error in User ID conversion'){
        console.log('User does not exist')
      }
      else{
        return response.data;
      }
    }catch(error){
      console.log('error in DoctorUUID to DoctorID', error)
    }
  }

  const handleSubmit = async (e) => {
      e.preventDefault();
      const DoctorID = await DoctorUUIDtoDoctorID();
      try {
        setError("")
        setLoading(true)
        const bool = await DataService.addingDoctorInfo(newDoctorInfo, DoctorID)
        if(bool.data === true){
          // navigate("/vet-dashboard");// this would be more efficient i think, but when navigate is used, the data doesn't load in time
          window.location.href = '/vet-dashboard';
        }
      } catch (error) {
        console.log('err in adding data 1',error)
        setError(error.response.data);
      }
      setLoading(false)
  }

  return (
    <Card>
      <Card.Body>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group id = "FirstName">
          <Form.Label> First Name: </Form.Label>
              <Form.Control required type="text" value={newDoctorInfo.FirstName} onChange={event => setNewDoctorInfo({...newDoctorInfo, FirstName: event.target.value})} />
        </Form.Group>
        <br />
        
        <Form.Group id = "LastName">
        <Form.Label>Last Name: </Form.Label>
            <Form.Control required type="text" value={newDoctorInfo.LastName} onChange={event => setNewDoctorInfo({...newDoctorInfo, LastName: event.target.value})} />
        </Form.Group>
        <br />
        
        <Form.Group id = "Gender">
        <Form.Label> Gender: </Form.Label>
            <select required value={newDoctorInfo.Gender} onChange={event => setNewDoctorInfo({...newDoctorInfo, Gender: event.target.value})}>
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
        <select required defaultValue = "" value={newDoctorInfo.DOB_month} onChange={event => setNewDoctorInfo({...newDoctorInfo, DOB_month: event.target.value})}>
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
        <select required defaultValue = "" value={newDoctorInfo.DOB_day} onChange={event => setNewDoctorInfo({...newDoctorInfo, DOB_day: event.target.value})}>
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
        <select required defaultValue = "" value={newDoctorInfo.DOB_year} onChange={event => setNewDoctorInfo({...newDoctorInfo, DOB_year: event.target.value})}>
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
