import React, {useEffect, useContext, useState} from 'react'
import {Link} from "react-router-dom";
import {Button, Card, Form, Carousel, Accordion, ToggleButton, ToggleButtonGroup} from 'react-bootstrap';
import { VerifyContext } from '../../Contexts/VerifyContext.js';
import DoctorHeader from './doctor-header.js';
import PrivateDoctorDataService from '../../Services/private-doctor-data-service.js';

export default function DoctorAccountDetails() {
  const [listDetails, setListDetails] = useState({});
  const {user_verification} = useContext(VerifyContext);
  const [user_type, setUser_type] = useState(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  
  const [selectedInsurance, setSelectedInsurance] = useState('');
  const [acceptedInsurances, setAcceptedInsurances] = useState(
    JSON.parse(sessionStorage.getItem("DoctorAccountDetails"))?.[0] || []
  );

  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [spokenLanguages, setSpokenLanguages] = useState(
    JSON.parse(sessionStorage.getItem("DoctorAccountDetails"))?.[1] || []
  );

  const [selectedOrganization, setSelectedOrganization] = useState('');
  const [selectedSpecialty, setSelectedSpecialties] = useState('');
  const [doctorSpecialties, setDoctorSpecialties] = useState(
    JSON.parse(sessionStorage.getItem("DoctorAccountDetails"))?.[3] || []
  );

  const [isDescriptionOverLimit, setIsDescriptionOverLimit] = useState(false);
  const [description, setDescription] = useState(
    JSON.parse(sessionStorage.getItem("DoctorAccountDetails"))?.[6] || {}
  );

  const verified = JSON.parse(sessionStorage.getItem("DoctorAccountDetails"))?.[8][0].Verified || []
  const [publiclyAvailable, setPubliclyAvailable] = useState(
    JSON.parse(sessionStorage.getItem("DoctorAccountDetails"))?.[8][0]?.PubliclyAvailable || 0
  );

  useEffect(()=>{
    console.log('in accountDetails useEffect')
    user_verification()
    .then(result => {
      if (result.verified === true) {
        setUser_type(result.user_type)
        if(result.user_type === 'Doctor'){
          try{
            console.log(`Used ${DoctorAccountDetails.name} useEffect`);
            const storedAccountDetails = sessionStorage.getItem("DoctorAccountDetails")
            if(!storedAccountDetails){
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
        const response = await PrivateDoctorDataService.fillAccountDetails();
        // console.log(response.data)
        if (response){
            if(response.data[0]){
              setAcceptedInsurances(response.data[0])
            }
            if(response.data[1]){
              setSpokenLanguages(response.data[1])
            }
            if(response.data[3]){
              setDoctorSpecialties(response.data[3])
            }
            if(response.data[6] && Object.keys(response.data[6]).length > 0){
              setDescription(response.data[6]);
              if(response.data[6].Description.length === 1000){
                setIsDescriptionOverLimit(true);
              }
            }
            if(response.data[8][0].PubliclyAvailable){
              setPubliclyAvailable(response.data[8][0].PubliclyAvailable)
            }
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
        const response = await PrivateDoctorDataService.fillLists();
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
    // from React Bootstrap
  };

  const handleLanguageChange = (event) => {
    try{
      const languageId = parseInt(event.target.value);
      if (languageId) {
        const language = listDetails[1].find(lang => lang.language_listID === languageId);
        setSelectedLanguage(language);
      } else {
        setSelectedLanguage(null);
      }
    }catch (error) {
    console.log('error in handle language change', error)
    }
  };
  
  const handleAddLanguage = () => {
    if(selectedLanguage){
      if(spokenLanguages.length >0){
        if(!spokenLanguages.includes(selectedLanguage)){
          setSpokenLanguages([...spokenLanguages, selectedLanguage]);
        }
      }else{
        setSpokenLanguages([selectedLanguage]);
      }
    }
    setSelectedLanguage('');
  };

  const handleDeleteLanguage = (language) => {
    setSpokenLanguages(spokenLanguages.filter(l => l !== language));
  };

  async function saveLanguages(){
    const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails"));
    const languageIds = spokenLanguages.map(lang => lang.language_listID).sort((a,b)=>a-b); // spoken languages are those that are on server side. state changes when languages added/deleted
    const savedLanguages = JSON.parse(sessionStorage.getItem("DoctorAccountDetails"))?.[1] || []
    const savedLanguagesIDs = savedLanguages.map(language => language.language_listID).sort((a,b)=>a-b);

    if(!checkIfListsAreEqual(languageIds, savedLanguagesIDs)){//checks if they are the same
      try {
        const response = await PrivateDoctorDataService.saveGeneralData(languageIds, 'Language')
        if(response.status === 200){
          DoctorAccountDetails[1] = spokenLanguages;
          sessionStorage.setItem("DoctorAccountDetails", JSON.stringify(DoctorAccountDetails));
          console.log('Saved!');
        }
      } catch(error) {
        console.log('error in saving languages', error)
      }
    }else{
      console.log('same')
    }
  };

  const handleSelectSpecialty = (event) => {
    try{
      const specialtyId = parseInt(event.target.value);
      if (specialtyId) {
        const specialty = listDetails[3].find((item) => item.specialties_listID === parseInt(event.target.value));
        setSelectedSpecialties(specialty);
      } else {
        setSelectedSpecialties(null);
      }
    }catch (error) {
    console.log('error in handleSelectSpecialty', error)
  }
  };

  const handleAddSpecialty = () => {
    if(selectedSpecialty){
      if(doctorSpecialties.length >0){
        if(!doctorSpecialties.includes(selectedSpecialty)){
          setDoctorSpecialties([...doctorSpecialties, selectedSpecialty]);
        }
      }else{
        setDoctorSpecialties([selectedSpecialty]);
      }
    }
    setSelectedSpecialties('');
  };

  const handleDeleteSpecialty = (specialty) => {
    setDoctorSpecialties(doctorSpecialties.filter(s => s !== specialty));
  };

  async function saveSpecialies(){
    const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails"));
    const specialtyIds = doctorSpecialties.map(specialty => specialty.specialties_listID).sort((a,b)=>a-b); // spoken languages are those that are on server side. state changes when languages added/deleted
    const savedSpecialties = JSON.parse(sessionStorage.getItem("DoctorAccountDetails"))?.[3] || []
    const savedSpecialtyIDs = savedSpecialties.map(specialty => specialty.specialties_listID).sort((a,b)=>a-b);

    if(!checkIfListsAreEqual(specialtyIds, savedSpecialtyIDs)){//checks if they are the same
      try {
        const response = await PrivateDoctorDataService.saveGeneralData(specialtyIds, 'Specialty')
        if(response.status === 200){
          DoctorAccountDetails[3] = doctorSpecialties;
          sessionStorage.setItem("DoctorAccountDetails", JSON.stringify(DoctorAccountDetails));
          console.log('Saved!');
        }
      } catch(error) {
        console.log('error in saving specialites', error)
      }
    }else{
      console.log('same')
    }
  };

  const specialties = selectedOrganization
    ? listDetails[3].filter((item) => item.Organization_name === selectedOrganization)
    : [];

  const handleInsuranceChange = (event) => {
    try {
      const insuranceId = parseInt(event.target.value);
      if (insuranceId) {
        const insurance = listDetails[0].find(ins => ins.insurance_listID === insuranceId);
        setSelectedInsurance(insurance);
      } else {
        setSelectedInsurance(null);
      }
    } catch (error) {
      console.log('error in handle insurance change', error)
    }
  };
  
  const handleAddInsurance = () => {
    if(selectedInsurance){
      if(acceptedInsurances.length >0){
        if(!acceptedInsurances.includes(selectedInsurance)){
          setAcceptedInsurances([...acceptedInsurances, selectedInsurance]);
        }
      }else{
        setAcceptedInsurances([selectedInsurance]);
      }
    }
    setSelectedInsurance('');
  };

  const handleDeleteInsurance = (insurance) => {
    setAcceptedInsurances(acceptedInsurances.filter(i => i !== insurance));
  };

  async function saveInsurances(){
    const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails"));
    const insuranceIds = acceptedInsurances.map(ins => ins.insurance_listID).sort((a,b)=>a-b); // list of all added insurances
    const savedInsurances = JSON.parse(sessionStorage.getItem("DoctorAccountDetails"))?.[0] || []
    const savedInsurancesIDs = savedInsurances.map(insurance => insurance.insurance_listID).sort((a,b)=>a-b);

    if(!checkIfListsAreEqual(insuranceIds, savedInsurancesIDs)){//only saves if the insurances changed
      try {
        const response = await PrivateDoctorDataService.saveGeneralData(insuranceIds, 'Insurance')
        if(response.status === 200){
          DoctorAccountDetails[0] = acceptedInsurances;
          sessionStorage.setItem("DoctorAccountDetails", JSON.stringify(DoctorAccountDetails));
          console.log('Saved!');
        }
      } catch(error) {
        console.log('error in saving Insurances', error)
      }
    }else{
      console.log('same')
    }
  };

  function checkIfListsAreEqual(list1, list2) {
    // Convert each list to a set
    const set1 = new Set(list1);
    const set2 = new Set(list2);
    // Check if the size of both sets is the same
    if (set1.size !== set2.size) {
      return false;
    }
    // Check if every element in set1 exists in set2
    for (const element of set1) {
      if (!set2.has(element)) {
        return false;
      }
    }
    // Check if every element in set2 exists in set1
    for (const element of set2) {
      if (!set1.has(element)) {
        return false;
      }
    }
    // If both sets contain the same elements, return true
    return true;
  }

  function handleDescriptionChange(event) {
    const value = event.target.value;
    setDescription({Description: value});
    setIsDescriptionOverLimit(value.length >= 1000);// if description length is over 1000, makes counter red.
  };

  async function saveDescription(event){
    event.preventDefault();
    const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails"));
    if(description.Description !== DoctorAccountDetails[6].Description){//makes sure that it's only pushing to DB if description changed
      try {
        const response = await PrivateDoctorDataService.saveDescriptionData(description);
        if(response.status === 200){
          DoctorAccountDetails[6] = description;
          sessionStorage.setItem("DoctorAccountDetails", JSON.stringify(DoctorAccountDetails));
          console.log('Saved!');
        }
      } catch(error) {
        console.log('error in saveDescription', error)
      }
    }
  };

  const counterStyle = {
    color: isDescriptionOverLimit ? "red" : "black",
  };

  async function handlePublicAvailibilityToggle (value) {
    setPubliclyAvailable(value);
    const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails"));
    try{
      const response = await PrivateDoctorDataService.savePublicAvailibility(value);
      if(response.status === 200){
        DoctorAccountDetails[8][0].PubliclyAvailable = value;
        sessionStorage.setItem("DoctorAccountDetails", JSON.stringify(DoctorAccountDetails));
        console.log('Saved!');
      }
    }catch(error){
      console.log('error in handlePublicAvailibilityToggle', error)

    }
  }

  return (
    <div>
      <DoctorHeader/>
      <p>This is the Account Details Page</p>

      <Card>
        <Card.Body>
          <Form onSubmit={saveDescription}> 
            {description.Description ? (
              <Form.Group id = "Description" className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control 
                  id="Description" 
                  value={description.Description}
                  onChange = {handleDescriptionChange}
                  maxLength={1000} // limit to 1000 characters
                  as="textarea" rows={3}
                />
                <div style={counterStyle}>Character Limit: {description.Description.length} / 1000</div>
              </Form.Group>
            ):(
              <Form.Group id = "Description">
                <Form.Label>Description</Form.Label>
                <Form.Control 
                    id="Description" 
                    defaultValue="" 
                    onChange = {handleDescriptionChange}
                    maxLength={1000} // limit to 1000 characters
                    as="textarea" rows={3}
                  />
              </Form.Group>
            )}
            <div className="d-grid justify-content-md-end">
            <Button onClick={saveDescription}>Save</Button>
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
          src = "../../Images/ProfileImage.jpg"
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
          src = "../../Images/ProfileImage.jpg"
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
          {Array.from(new Set(listDetails[3]?.map((item) => item.Organization_name))).length > 0 ? (
            <>
              <label htmlFor="organization">Select an organization: </label>
              <select
                id="organization"
                name="organization"
                value={selectedOrganization}
                onChange={(e) => setSelectedOrganization(e.target.value)}
              >
                <option value="">Choose an organization</option>
                {Array.from(new Set(listDetails[3]?.map((item) => item.Organization_name))).map(
                  (organization, index) => (
                    <option key={index} value={organization}>
                      {organization}
                    </option>
                  ))}
              </select>
              <br />
              {selectedOrganization && (
                <>
                  <label htmlFor="specialty">Select a specialty: </label>
                  <select
                    id="specialty"
                    name="specialty"
                    value={selectedSpecialty?.specialties_listID || ""}
                    onChange={handleSelectSpecialty}
                  >
                    <option value="">Choose a specialty</option>
                    {specialties
                      .filter(
                        (specialty) =>
                          !doctorSpecialties.find(
                            (doctorSpecialty) =>
                              doctorSpecialty.specialties_listID === specialty.specialties_listID
                          )
                      )
                      .map((specialty) => (
                        <option key={specialty.specialties_listID} value={specialty.specialties_listID}>
                          {specialty.Specialty_name}
                        </option>
                      ))}
                  </select>
                  <Button onClick={handleAddSpecialty}>Add</Button>
                </>
              )}
              <ul>
                {doctorSpecialties.map((specialty) => (
                  <li key={specialty.specialties_listID}>
                    {specialty.Organization_name} - {specialty.Specialty_name}{" "}
                    <Button onClick={() => handleDeleteSpecialty(specialty)}>X</Button>
                  </li>
                ))}
              </ul>
              <Button onClick={saveSpecialies}>Save</Button>
            </>
          ) : (
            <p>Loading</p>
          )}
        </Card.Body>
      </Card>
    <br/>

    <Card>
    <Card.Body>
    Insurances
    <br/>
    <label htmlFor="insurance">Select a insurance: </label>
      <select id="insurance" name="insurance" value={selectedInsurance?.insurance_listID || ''} onChange={handleInsuranceChange}>
        <option value ="">Choose an insurance</option>
        {Array.isArray(listDetails[0]) &&
            listDetails[0].length > 0 &&
            listDetails[0]
              .filter((insurance) => !acceptedInsurances.find((accepted) => accepted.insurance_listID === insurance.insurance_listID))
              .map((insurance) => (
                <option key={insurance?.insurance_listID} value={insurance?.insurance_listID}>
                  {insurance?.Insurance_name}
                </option>
        ))}
      </select>
      <Button onClick={handleAddInsurance}>Add</Button>
      <ul>
        {Array.isArray(acceptedInsurances) && acceptedInsurances.map(insurance => (
        <li key={insurance.insurance_listID}>
          {insurance.Insurance_name} <Button onClick={() => handleDeleteInsurance(insurance)}>x</Button>
        </li>
        ))}
      </ul>
      <Button onClick={saveInsurances}>Save</Button>

      </Card.Body>
    </Card>
    <br/>

    <Card>
    <Card.Body>
    Languages
    <br/>
    <label htmlFor="language">Select a language: </label>
    <select
      id="language"
      name="language"
      value={selectedLanguage?.language_listID || ""}
      onChange={handleLanguageChange}
    >
      <option value="">Choose a language</option>
      {Array.isArray(listDetails[1]) &&
        listDetails[1].length > 0 &&
        listDetails[1]
          .filter((language) => !spokenLanguages.find((spoken) => spoken.language_listID === language.language_listID))
          .map((language) => (
            <option key={language?.language_listID} value={language?.language_listID}>
              {language?.Language_name}
            </option>
          ))}
    </select>
    <Button onClick={handleAddLanguage}>Add</Button>
    <ul>
      {Array.isArray(spokenLanguages) &&
        spokenLanguages.map((language) => (
          <li key={language.language_listID}>
            {language.Language_name}
            <Button onClick={() => handleDeleteLanguage(language)}>x</Button>
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
    <br/>

    <Card>
      <Card.Header>
        Verification and Search Results
      </Card.Header>
      <Card.Body>
        Account Verification Status:
        <div>
          {verified ? (
            <Button
            variant="success"
            disabled          
          >
            ✓ (Your identity is Verified)
          </Button>
          ):(
            <Button
              variant="danger"
              disabled
              >
              X (Your identity is Not Verified)
            </Button>
          )
          }
       </div>
        <br/>

        Would you like your profile to be publicly Available?
        <br/>
        <ToggleButtonGroup type="radio" name="options" value={publiclyAvailable ?? 0} onChange={handlePublicAvailibilityToggle}>
          <ToggleButton id="tbg-radio-1" value = {0} style={{ backgroundColor: publiclyAvailable === 0 ? "red" : "white", color: publiclyAvailable === 0 ? "white" : "black", borderColor: "black"}}>
            No
          </ToggleButton>
          <ToggleButton id="tbg-radio-2" value = {1} style={{ backgroundColor: publiclyAvailable === 1 ? "green" : "white", color: publiclyAvailable === 1 ? "white" : "black", borderColor: "black"}}>
            Yes
          </ToggleButton>
      </ToggleButtonGroup>
      </Card.Body>
    </Card>
  </div>
  )
};

