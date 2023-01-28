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
    const [globalToken, setglobalToken] = useState(false)
    const navigate = useNavigate();
    const jsonString = localStorage.getItem('user');
    const doctorIDfromjsonData = JSON.parse(jsonString);
    

    useEffect(() => {
      user_verification();
    }, []);

    function getCookie(accessToken) {
      const value = "; " + document.cookie;
      const parts = value.split("; " + accessToken + "=");
      console.log(parts)
      if (parts.length === 2){
        const return_token = parts.pop().split(";").shift()
        return return_token
      }
      else{
        console.log('elsed')
        return null
      }
    }

    async function user_verification (){
      const accessToken = getCookie('accessToken');
      // console.log(accessToken)
      if(accessToken){
        console.log('accesed',accessToken);
        const response = await VetDataService.verify(accessToken)
        if(response.data.success === true){
          setglobalToken(true)
          console.log('true');
        }
        else{// if user not veriifed
          setglobalToken(false);
        }
      }
    else{// if no token received
      setglobalToken(false);
    }
  }
  if(!globalToken){
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
        const bool = await VetDataService.addingDoctorInfo(firstName, lastName, gender, DOBmonth, DOBday, DOByear, doctorIDfromjsonData.DoctorID)
        if(bool.data === true){
          // navigate("/new-vet-2");
          navigate(`/user/${doctorIDfromjsonData.DoctorID}`)
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

        <Form.Label>Date of Birth:</Form.Label>
            <Form.Control required type="text" placeholder="MM" value={DOBmonth} onChange={e => setDOBmonth( e.target.value )} />
            <br />
            <Form.Control required type="text" placeholder="DD" value={DOBday} onChange={e => setDOBday(e.target.value)} />
            <br />
            <Form.Control required type="text" placeholder="YYYY" value={DOByear} onChange={e => setDOByear(e.target.value)} />
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