import React, { useState, useEffect} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {useParams} from "react-router-dom";
import PublicDoctorDataService from '../Services/public-doctor-data-service.js';
import Header from './header.js';

async function getDoctor (id, setDoctorData, setError) {
  try{
    const response = await PublicDoctorDataService.getSingleDoctor(id)
      if (response.data === 'User does not exist') {
        return <p>{response.data}</p>;
      }
      else{
        console.log('response.data',response.data)
        setDoctorData(response.data);
      }
  }catch(e){
    console.error(`Unable to getDoctor, ${e}`);
    setError('An error occurred');
  }
};

export default function Doctor () {
  // Creates an id variable which gets the id of the current page. 
  let { id } = useParams(); //the id of the current site (which doctorData) --> used to set User
  const [acceptedInsurances, setAcceptedInsurances] = useState([]);
  const [spokenLanguages, setSpokenLanguages] = useState([]);
  const [acceptedServices, setAcceptedServices] = useState([]);
  const [doctorSpecialties, setDoctorSpecialties] = useState([]);
  const [preVetEducation, setPreVetEducation] = useState([]);
  const [vetEducation, setVetEducation] = useState([]);
  const [addresses, setAddresses] = useState([{ address_priority: 0, addresses_ID: 0, address_title: '', address_line_1  : '', address_line_2: '', city: '', state: '', zip: '', country: '', phone_priority: 0, phone: '', address_public_status: 1, times:[]}]);
  const [description, setDescription] = useState({});
  const [personalData, setPersonalData] = useState({});
  const [error, setError] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  
  if (Number(id)){
    id = Number(id)
  }

  async function FillDoctorData(id, setIsLoading){
    try{
      const response = await PublicDoctorDataService.getSingleDoctor(id)
      if (response){
        if(response.data[0]){
          setAcceptedInsurances(response.data[0])
        }
        if(response.data[1]){
          setSpokenLanguages(response.data[1])
        }
        if(response.data[2]){
          setAcceptedServices(response.data[2])
        }
        if(response.data[3]){
          setDoctorSpecialties(response.data[3])
        }
        if(response.data[4]){
          setPreVetEducation(response.data[4])
        }
        if(response.data[5]){
          setVetEducation(response.data[5])
        }
        if(response.data[6]){
          setAddresses(response.data[6])
        }
        if(response.data[7] && Object.keys(response.data[7]).length > 0){
          setDescription(response.data[7]);
        }
        if(response.data[8]){
          //Somehow set pictures.
        }
        if(response.data[9]){
          console.log(response.data[9])
          setPersonalData(response.data[9])
        }
        setIsLoading(false);
      }else{
        console.log('no response');
      }
    }catch(error){
        console.log(error)
        setError(error)
      }
    }

  useEffect(() => {
    FillDoctorData(id, setIsLoading);
  }, []);

  if (error.length) {
    console.log(error);
    return (
      <>
      <Header dropdown = {true} search = {true}/>
        {error && <div className="alert alert-danger">{error}</div>}
        <Card>
          <Card.Body>
            <p>Vet "{id}" does not exist</p>
            <a href="/">
              <Button variant="primary">
                <p>Go back home (Href)</p>
              </Button>
            </a>
          </Card.Body>
        </Card>
      </>
    );
  }
  
  return (
    <>
      <Header dropdown = {true} search = {true}/>
      {personalData?(
        <>
          <h1> Dr. {personalData.FirstName.charAt(0).toUpperCase() + personalData.FirstName.slice(1)} {personalData.LastName.charAt(0).toUpperCase() + personalData.LastName.slice(1)}</h1>
          <Card key={id} style={{margin: '0 10px' }}>
            {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
            <Card.Body>
              <Card.Title>Title</Card.Title>
              <Card.Text>
                My ID: {id}<br></br>
                My FirstName: {personalData.FirstName}<br/>
                My LastName: {personalData.LastName}<br></br>
                My gender: {personalData.Gender}
              </Card.Text>
              <a href = "/">
                  <Button variant="primary" >
                    <p>Go back home (Href)</p>
                </Button>
              </a>
            </Card.Body>
          </Card>
        </>
      ):
      (<div>
        helo
        </div>)
      }
      
    </>
  );
};
