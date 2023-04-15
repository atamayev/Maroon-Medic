import React, {useEffect, useContext, useState} from 'react'
import {Link} from "react-router-dom";
import {Button, Card, Form, Carousel, Accordion, ToggleButton, ToggleButtonGroup} from 'react-bootstrap';
import { VerifyContext } from '../../Contexts/VerifyContext.js';
import DoctorHeader from './doctor-header.js';
import PrivateDoctorDataService from '../../Services/private-doctor-data-service.js';
import Header from '../header.js';
import FormGroup from '../../Components/form-group.js';

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

  const [selectedPreVetSchool, setSelectedPreVetSchool] = useState('');
  const [selectedMajor, setSelectedMajor] = useState('');
  const [selectedPreVetEducationType, setSelectedPreVetEducationType] = useState('');
  const [preVetEducation, setPreVetEducation] = useState(
    JSON.parse(sessionStorage.getItem("DoctorAccountDetails"))?.[4] || []
  );

  const [selectedVetSchool, setSelectedVetSchool] = useState('');
  const [selectedVetEducationType, setSelectedVetEducationType] = useState('');
  const [vetEducation, setVetEducation] = useState(
    JSON.parse(sessionStorage.getItem("DoctorAccountDetails"))?.[5] || []
  );

  const [isDescriptionOverLimit, setIsDescriptionOverLimit] = useState(false);
  const [description, setDescription] = useState(
    JSON.parse(sessionStorage.getItem("DoctorAccountDetails"))?.[7] || {}
  );

  const verified = JSON.parse(sessionStorage.getItem("DoctorAccountDetails"))?.[9][0].Verified || []
  const [publiclyAvailable, setPubliclyAvailable] = useState(
    JSON.parse(sessionStorage.getItem("DoctorAccountDetails"))?.[9][0]?.PubliclyAvailable || 0
  );

  useEffect(()=>{
    user_verification()
    .then(result => {
      if (result.verified === true) {
        setUser_type(result.user_type)
        if(result.user_type === 'Doctor'){
          try{
            const storedAccountDetails = sessionStorage.getItem("DoctorAccountDetails")
            if(!storedAccountDetails){
              FillDoctorAccountDetails();
            }
            const storedListDetails = sessionStorage.getItem("ListDetails")
            if(storedListDetails){
              setListDetails(JSON.parse(storedListDetails));
            }else{
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
    try{
        const response = await PrivateDoctorDataService.fillAccountDetails();
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
            if(response.data[4]){
              setPreVetEducation(response.data[4])
            }
            if(response.data[5]){
              setVetEducation(response.data[5])
            }
            if(response.data[7] && Object.keys(response.data[7]).length > 0){
              setDescription(response.data[7]);
              if(response.data[7].Description.length === 1000){
                setIsDescriptionOverLimit(true);
              }
            }
            if(response.data[9][0].PubliclyAvailable){
              setPubliclyAvailable(response.data[9][0].PubliclyAvailable)
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
    try{
        const response = await PrivateDoctorDataService.fillLists();
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

  function isObjectsEqual(obj1, obj2) {
    const keys1 = Object.keys(obj1).sort();
    const keys2 = Object.keys(obj2).sort();
  
    if (keys1.length !== keys2.length) {
      return false;
    }
  
    for (let i = 0; i < keys1.length; i++) {
      const key1 = keys1[i];
      const key2 = keys2[i];
  
      if (key1 !== key2 || obj1[key1] !== obj2[key2]) {
        return false;
      }
    }
    return true;
  }

  function isObjectInArray(newObj, objectsArray) {
    for (const obj of objectsArray) {
      if (isObjectsEqual(newObj, obj)) {
        return true;
      }
    }
    return false;
  }

  const handlePreVetSchoolChange = (event) => {
    try {
      const schoolID = parseInt(event.target.value);
      if (schoolID) {
        const school = listDetails[4].find(sch => sch.pre_vet_school_listID === schoolID);
        setSelectedPreVetSchool(school);
      } else {
        setSelectedPreVetSchool(null);
      }
    } catch (error) {
      console.log('error in handle prevetschool change', error)
    }
  };
  
  const handlePreVetEducationTypeChange = (event) => {
    try {
      const educationTypeID = parseInt(event.target.value);
      if (educationTypeID) {
        const educationType = listDetails[5].find(sch => sch.pre_vet_education_typeID === educationTypeID);
        setSelectedPreVetEducationType(educationType);
      } else {
        setSelectedPreVetSchool(null);
      }
    } catch (error) {
      console.log('error in handlePreVetEducationTypeChange', error)
    }
  };

  const handlePreVetMajorChange = (event) => {
    try {
      const majorID = parseInt(event.target.value);
      if (majorID) {
        const major = listDetails[6].find(maj => maj.major_listID === majorID);
        setSelectedMajor(major);
      } else {
        setSelectedMajor(null);
      }
    } catch (error) {
      console.log('error in handle handlePreVetMajorChange', error)
    }
  };
  
  const handleAddPreVetEducation = () => {
    if(selectedPreVetSchool && selectedMajor && selectedPreVetEducationType){
      const selectedEducationObj = {
        School_name: selectedPreVetSchool, 
        Education_type:selectedPreVetEducationType,
        Major_name: selectedMajor
      }
      if(preVetEducation.length >0){

        if(!isObjectInArray(selectedEducationObj, preVetEducation)){
          setPreVetEducation([...preVetEducation, {School_name: selectedPreVetSchool, Education_type: selectedPreVetEducationType, Major_name: selectedMajor}]);
        }

      }else{
        setPreVetEducation([{School_name: selectedPreVetSchool, Education_type: selectedPreVetEducationType, Major_name: selectedMajor}]);
      }
    }
    setSelectedPreVetSchool('');
    setSelectedMajor('');
    setSelectedPreVetEducationType('');
  };

  const handleDeletePreVetEducation = (PreVetEducationObject) => {
    setPreVetEducation(preVetEducation.filter(obj => !isObjectsEqual(obj, PreVetEducationObject)));
  };

  async function savePreVetSchool(){
    const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails"));
    const savedPreVetEducations = JSON.parse(sessionStorage.getItem("DoctorAccountDetails"))?.[4] || []

    if(!isObjectInArray(preVetEducation, savedPreVetEducations)){//only saves if the insurances changed
      try {
        const response = await PrivateDoctorDataService.saveEducationData(preVetEducation, 'pre_vet')
        if(response.status === 200){
          DoctorAccountDetails[4] = preVetEducation;
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

  const handleVetSchoolChange = (event) => {
    try {
      const schoolID = parseInt(event.target.value);
      if (schoolID) {
        const school = listDetails[5].find(sch => sch.vet_school_listID === schoolID);
        setSelectedVetSchool(school);
      } else {
        setSelectedVetSchool(null);
      }
    } catch (error) {
      console.log('error in handle vetschool change', error)
    }
  };
  
  const handleAddVetEducation = () => {
    if(selectedVetSchool && selectedVetEducationType){
      const selectedEducationObj = {
        School_name: selectedVetSchool, 
        Education_type: selectedVetEducationType,
      }
      if(vetEducation.length >0){
        if(!isObjectInArray(selectedEducationObj, vetEducation)){
          setVetEducation([...vetEducation, {School_name: selectedVetSchool, Education_type: selectedVetEducationType}]);
        }
      }else{
        setVetEducation([{School_name: selectedVetSchool, Education_type: selectedVetEducationType}]);
      }
    }
    setSelectedVetSchool('');
    setSelectedVetEducationType('');
  };

  const handleDeleteVetEducation = (vetEducationObject) => {
    setVetEducation(vetEducationObject.filter(obj => !isObjectsEqual(obj, vetEducationObject)));
  };

  async function saveVetSchool(){
    const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails"));
    const savedVetEducations = JSON.parse(sessionStorage.getItem("DoctorAccountDetails"))?.[5] || []

    if(!isObjectInArray(vetEducation, savedVetEducations)){//only saves if the insurances changed
      try {
        const response = await PrivateDoctorDataService.saveEducationData(preVetEducation, 'vet')
        if(response.status === 200){
          DoctorAccountDetails[5] = vetEducation;
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

  function handleDescriptionChange(event) {
    const value = event.target.value;
    setDescription({Description: value});
    setIsDescriptionOverLimit(value.length >= 1000);// if description length is over 1000, makes counter red.
  };

  async function saveDescription(event){
    event.preventDefault();
    const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails"));
    if(description.Description !== DoctorAccountDetails[7].Description){//makes sure that it's only pushing to DB if description changed
      try {
        const response = await PrivateDoctorDataService.saveDescriptionData(description);
        if(response.status === 200){
          DoctorAccountDetails[7] = description;
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
        DoctorAccountDetails[9][0].PubliclyAvailable = value;
        sessionStorage.setItem("DoctorAccountDetails", JSON.stringify(DoctorAccountDetails));
        console.log('Saved!');
      }
    }catch(error){
      console.log('error in handlePublicAvailibilityToggle', error)
    }
  }

  const renderIsPreVetEducation = ()=>{
    if(Array.from(new Set(listDetails[4]?.map((item) => item.School_name))).length > 0){
      return(
        <>
          <label htmlFor="pre-vet-school">Select a school: </label>
          <select
            id="pre-vet-school"
            name="pre-vet-school"
            value={selectedPreVetSchool}
            onChange={(e) => setSelectedPreVetSchool(e.target.value)}
          >
            <option value="">Choose a School</option>
            {Array.from(new Set(listDetails[4]?.map((item) => item.School_name))).map(
              (school, index) => (
                <option key={index} value={school}>
                  {school}
                </option>
              ))}
          </select>
          <br />
          {selectedPreVetSchool && (
            <>
              <label htmlFor="major">Select a Major: </label>
              <select
                id="major"
                name="major"
                value={selectedMajor?.major_listID || ""}
                onChange={handlePreVetMajorChange}
              >
                <option value="">Choose a major</option>
                {listDetails[6]
                  .map((major) => (
                    <option key={major.major_listID} value={major.major_listID}>
                      {major.Major_name}
                    </option>
                  ))}
              </select>
            </>
          )
          }
          <br/>
            {selectedMajor && (
              <>
              <label htmlFor="education-type">Select a Type of Education: </label>
                <select
                  id="education"
                  name="education"
                  value={selectedPreVetEducationType?.pre_vet_education_typeID || ""}
                  onChange={handlePreVetEducationTypeChange}
                >
                  <option value="">Choose an Education Type</option>
                  {listDetails[5]
                    .map((preVetEdType) => (
                      <option key={preVetEdType.pre_vet_education_typeID} value={preVetEdType.pre_vet_education_typeID}>
                        {preVetEdType.Education_type}
                      </option>
                    ))}
                </select>
                <Button onClick={handleAddPreVetEducation}>Add</Button>
              </>
            )}
          <ul>
            {preVetEducation.map((pre_vet_education) => (
              <li key={pre_vet_education.specialties_listID}>
                {pre_vet_education.School_name}, {pre_vet_education.Major_name}, {pre_vet_education.Education_type}{" "}
                <Button onClick={() => handleDeletePreVetEducation(pre_vet_education)}>X</Button>
              </li>
            ))}
          </ul>
          <Button onClick={savePreVetSchool}>Save</Button>
        </>
      )
    }else{
      return(
        <p>Loading...</p>
      )
    }
  }

  const renderPreVetEducationSection = () =>{
    return(
        <Card>
        <Card.Header>
          Change all of this card to pre-vet education
        </Card.Header>
        <Card.Body>
          {renderIsPreVetEducation()}
        </Card.Body>
      </Card>
    )
  }

  const renderIsDescription = () =>{
    if (description.Description){
      return(
        <Form onSubmit={saveDescription}> 
        <FormGroup
            id="Description" 
            value={description.Description} 
            onChange = {handleDescriptionChange}
            maxLength={1000} // limit to 1000 characters
            as="textarea" 
            rows={3}
            label={"Description"}
          />
            <div style={counterStyle}>Character Limit: {description.Description.length} / 1000</div>
          <div className="d-grid justify-content-md-end">
        <Button onClick={saveDescription}>Save</Button>
        </div>
      </Form>
        )
    }else{
      return(
        <>
        <Form onSubmit={saveDescription}> 
          <FormGroup
              id="Description" 
              defaultValue="" 
              onChange = {handleDescriptionChange}
              maxLength={1000} // limit to 1000 characters
              as="textarea" 
              rows={3}
              label={"Description"}
            />
          <div className="d-grid justify-content-md-end">
            <Button onClick={saveDescription}>Save</Button>
          </div>
        </Form>
        </>
      )
    }
  }

  const renderDescriptionSection = () =>{
    return(
      <Card>
        <Card.Body>
          {renderIsDescription()}
        </Card.Body>
      </Card>
    )
  }

  const renderPersonalInfoLinkSection =  () =>{
    return(
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
    )
  }

  const renderPicturesSection = ()=>{
    return(
      <>
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
      </>
    )
  }

  const renderIsSpecialty = () =>{
    if(Array.from(new Set(listDetails[3]?.map((item) => item.Organization_name))).length){
      return(
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
      )
    }else{
      return(
        <p>Loading...</p>
      )
    }
  }

  const renderSpecialtySection = () =>{
    return(
      <Card>
        <Card.Body>
          {renderIsSpecialty()}
        </Card.Body>
      </Card>
    )
  }

  const renderInsuranceSection = () =>{
    return(
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
    )
  }

  const renderLanguageSection = () =>{
    return(
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
    )
  }

  const renderLocationsSection = () =>{
    return(
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
    )
  }

  const renderIsVerification = () =>{
    if(verified){
      return(
        <Button
            variant="success"
            disabled          
          >
          ✓ (Your identity is Verified)
        </Button>
      )
    }else{
      return(
        <Button
          variant="danger"
          disabled
          >
          X (Your identity is Not Verified)
        </Button>
      )
    }
  }

  const renderVerificationAndPublicStatusSection = () =>{
    return(
      <Card>
        <Card.Header>
          Verification and Search Results
        </Card.Header>
        <Card.Body>
          Account Verification Status:
          {renderIsVerification()}
          <br/>
          Would you like your profile to be Publicly Available?
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
    )
  }

  return (
    <div>
      <Header dropdown = {true}/>
      <DoctorHeader/>
      <p>This is the Account Details Page</p>
      {renderPreVetEducationSection()}
      <br/>
      {renderDescriptionSection()}
      <br/>
      {renderPersonalInfoLinkSection()}
      <br/>
      {renderPicturesSection()}
      <br/>
      {renderSpecialtySection()}
      <br/>
      {renderInsuranceSection}
      <br/>
      {renderLanguageSection()}
      <br/>
      {renderLocationsSection()}
      <br/>
      {renderVerificationAndPublicStatusSection()}
  </div>
  )
};
