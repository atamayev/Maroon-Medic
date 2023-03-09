import React, {useEffect, useContext, useState} from 'react'
import {Link} from "react-router-dom";
import {Button, Card, Form, Carousel, Accordion} from 'react-bootstrap';
import { VerifyContext } from '../../Contexts/VerifyContext.js';
import DoctorHeader from './doctor-header.js';
import PrivateDoctorDataService from '../../Services/private-doctor-data-service.js';

export default function DoctorAccountDetails() {
  const [accountDetails, setAccountDetails] = useState({});
  const [listDetails, setListDetails] = useState({});
  const {user_verification} = useContext(VerifyContext);
  const [user_type, setUser_type] = useState(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [spokenLanguages, setSpokenLanguages] = useState([]); // might be better to combine this into accountDetails

  useEffect(()=>{
    console.log('in accountDetails useEffect')
    user_verification()
    .then(result => {
      if (result.verified === true && result.DoctorToken) {
        setUser_type('Doctor')
        console.log(`Used ${DoctorAccountDetails.name} useEffect`);
        
        const storedAccountDetails = sessionStorage.getItem("DoctorAccountDetails")
        if(storedAccountDetails){
          setAccountDetails(JSON.parse(storedAccountDetails));
        }else{
          console.log('fetching data from db (elsed)')
          FillDoctorAccountDetails();
        }
        const storedListDetails = sessionStorage.getItem("ListDetails")
        if(storedListDetails){
          setListDetails(JSON.parse(storedListDetails));
        }else{
          console.log('fetching data from db (elsed)')
          FillLists();
        }
      }
      else if (result.verified === true && result.PatientToken){
        setUser_type('Patient');
      }
      else{
        console.log('Unverified')
      }
    })
    .catch(error => {
      console.error(error);
    });
  }, []);

  if(user_type === 'Patient'){
    return(
      <Card>
        <Card.Body>
        <p>Unautorized to edit Doctor Details </p>;
        <Link to= {'/patient-edit-profile'}>
              <Button variant="primary">
                  <p>Return to Patient Edit Profile</p>
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
      </Card.Body>
    </Card>
    )
  }

  async function FillDoctorAccountDetails(){
    console.log('in FillDoctorAccountDetails')
    try{
        const response = await PrivateDoctorDataService.fillDoctorAccountDetails();
        console.log(response.data)
        if (response){
            setAccountDetails(response.data);
            sessionStorage.setItem("DoctorAccountDetails", JSON.stringify(response.data));
        }else{
          console.log('no response');
        }
      }catch(error){
        console.log('unable to fill AccountDetails', error)
      }
  }

  async function FillLists(){ 
    // this will be used to fill the lists in the db (insurances, languages, etc.) Should be one function that returns an object of arrays of hte different lists
    console.log('in fill lists')
    try{
        const response = await PrivateDoctorDataService.fillLanguages();
        // console.log(response.data)
        if (response){
            setListDetails(response.data);
            sessionStorage.setItem("ListDetails", JSON.stringify(response.data));
        }else{
          console.log('no response');
        }
      }catch(error){
        console.log('unable to fill ListDetails', error)
      }
  }

  const handleSelectCarousel = (selectedIndex, e) => {
    setCarouselIndex(selectedIndex);
  };

  const handleLanguageChange = (event) => {
    const languageId = parseInt(event.target.value);
    const language = listDetails.find(lang => lang.language_listID === languageId);
    setSelectedLanguage(language);
  };

  const handleAddLanguage = () => {
    if (selectedLanguage && !spokenLanguages.includes(selectedLanguage)) {
      setSpokenLanguages([...spokenLanguages, selectedLanguage]);
    }
    setSelectedLanguage('');
  };
  

  const handleDeleteLanguage = (language) => {
    setSpokenLanguages(spokenLanguages.filter(l => l !== language));
  };

  async function saveLanguages(){
    if(spokenLanguages.length >0){
      try {
        const languageIds = spokenLanguages.map(lang => lang.language_listID);
        console.log('Spoken language IDs:', languageIds);
        await PrivateDoctorDataService.saveLanguages(languageIds)
      } catch(error) {
        console.log('error in saving languages', error)
      }
    }else{
    }
  };

  return (
    <div>
      <DoctorHeader/>
      <p>This is the Account Details Page</p>

      <Card>
        <Card.Body>
        <Form>
            <Form.Group id = "Description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control id="Description" defaultValue={accountDetails.Description} onChange={(event) => setAccountDetails({...accountDetails, Description: event.target.value})}/>
            </Form.Group>
                <div className="d-grid justify-content-md-end">
                <Button type = "submit" className="btn btn-primary w-20">Save</Button>
                </div>
        </Form>
        </Card.Body>
      </Card>
      <br/>
      <Card>
        <Card.Body>
          Looking to edit your Profile Information? Click here: 
          <Link to= {'/vet-settings/personal-information'}>
              <Button variant="primary" className="btn btn-primary p-1">
                  <p>Edit Personal Information</p>
              </Button>
        </Link>
        </Card.Body>
      </Card>
      <br/>
      Edit Pictures:

      <Carousel activeIndex={carouselIndex} onSelect={handleSelectCarousel}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src = "../Images/ProfileImage.jpg"
          // src="holder.js/800x400?text=First slide&bg=373940"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="holder.js/800x400?text=Second slide&bg=282c34"
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          // src="holder.js/800x400?text=Third slide&bg=20232a"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      </Carousel>   
      <br/>

    <Card>
    <Card.Body>
    Languages
    <label htmlFor="language">Select a language:</label>
      <select id="language" name="language" value={selectedLanguage.language_listID || ''} onChange={handleLanguageChange}>
        <option value="">Choose a language</option>
        {/* {console.log(listDetails)} */}
        {Array.isArray(listDetails) && listDetails.map((language) => (
        <option key={language.language_listID} value={language.language_listID}>
          {language.Language_name}
        </option>
      ))}
      </select>
      <Button onClick={handleAddLanguage}>Add</Button>
      <ul>
        {spokenLanguages.map(language => (
          <li key={language.language_listID}>
            {language.Language_name} <Button onClick={() => handleDeleteLanguage(language)}>x</Button>
          </li>
        ))}
      </ul>
      <Button onClick={saveLanguages}>Save</Button>

      </Card.Body>
    </Card>
    <br/>
    
    <Card>
      <Card.Body>
        Locations
      <Accordion defaultActiveKey={['0']} alwaysOpen>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Accordion Item #1</Accordion.Header>
            {/* possibly: {accountDetails.Location.index.name}{accountDetails.Location.index.name} */}

          <Accordion.Body>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>Accordion Item #2</Accordion.Header>
          <Accordion.Body>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          </Accordion.Body>
      </Accordion.Item>
      </Accordion>
      </Card.Body>
    </Card>

  </div>
  )
};
