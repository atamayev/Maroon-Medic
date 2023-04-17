import React, {useEffect, useContext, useState} from 'react'
import {Link} from "react-router-dom";
import {Button, Card, Form, Carousel, Accordion, ToggleButton, ToggleButtonGroup} from 'react-bootstrap';
import { VerifyContext } from '../../Contexts/VerifyContext.js';
import DoctorHeader from './doctor-header.js';
import PrivateDoctorDataService from '../../Services/private-doctor-data-service.js';
import Header from '../header.js';
import FormGroup from '../../Components/form-group.js';
import { NonDoctorAccess } from '../../Components/user-type-unauth.js';
import { handleLanguageChange, handleSelectSpecialty, handleInsuranceChange, handleDescriptionChange, handlePreVetEducationTypeChange, handlePreVetMajorChange, handlePreVetSchoolChange, handleVetSchoolChange, handleSelectCarousel} from '../../Custom Hooks/Hooks for Doctor Account Details/select.js';
import { handleAddLanguage, handleAddSpecialty, handleAddInsurance, handleAddPreVetEducation, handleAddVetEducation } from '../../Custom Hooks/Hooks for Doctor Account Details/add.js';
import { handleDeleteInsurance, handleDeleteLanguage, handleDeleteSpecialty, handleDeletePreVetEducation, handleDeleteVetEducation } from '../../Custom Hooks/Hooks for Doctor Account Details/delete.js';
import { saveInsurances, saveLanguages, saveSpecialies, saveDescription, savePreVetSchool, saveVetSchool, handlePublicAvailibilityToggle } from '../../Custom Hooks/Hooks for Doctor Account Details/save.js';

async function FillLists(setListDetails){ 
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

  const years = [...Array(100).keys()].map(i => i + new Date().getFullYear() - 100);

  const [startYear, setStartYear] = useState(years[0]);
  const [endYear, setEndYear] = useState(years[0]);

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
              FillLists(setListDetails);
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
  
  if(user_type !== 'Doctor'){
    return(
      <NonDoctorAccess/>
    )
  }

  const specialties = selectedOrganization
    ? listDetails[3].filter((item) => item.Organization_name === selectedOrganization)
    : [];

  const counterStyle = {
    color: isDescriptionOverLimit ? "red" : "black",
  };

  const renderEducationTime = () =>{
    return(
      <div>
        <label>
          Start Month:
          <select name="startMonth">
            {months.map(month => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Start Year:
          <select value={startYear} onChange={e => setStartYear(e.target.value)}>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </label>
        <br />
        <label>
          End Month:
          <select name="endMonth">
            {months.map(month => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>
        </label>
        <br />
        <label>
          End Year:
          <select value={endYear} onChange={e => setEndYear(e.target.value)}>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </label>
        <br />
    </div>
    )
  }

  const renderIsPreVetEducation = ()=>{
    const allChoicesFilled = selectedPreVetSchool && selectedMajor && selectedPreVetEducationType;

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
                value={selectedMajor}
                onChange = {(event) => setSelectedMajor(event.target.value)}
              >
                <option value="">Choose a major</option>
                {Array.from(new Set(listDetails[6]?.map((item) => item.Major_name))).map(
              (major, index) => (
                <option key={index} value={major}>
                  {major}
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
                  value={selectedPreVetEducationType}
                  onChange={(event) => setSelectedPreVetEducationType(event.target.value)}
                >
                  <option value="">Choose an Education Type</option>
                  {Array.from(new Set(listDetails[5]?.map((item) => item.Education_type))).map(
                    (preVetEdType, index) => (
                      <option key={index} value={preVetEdType}>
                        {preVetEdType}
                      </option>
                    ))}
                  {listDetails[5]
                    .map((preVetEdType) => (
                      <option key={preVetEdType.pre_vet_education_typeID} value={preVetEdType.pre_vet_education_typeID}>
                        {preVetEdType.Education_type}
                      </option>
                    ))}
                </select>
                {allChoicesFilled && renderEducationTime()}
                  {allChoicesFilled && (
                    <Button onClick={() => handleAddPreVetEducation(selectedPreVetSchool, selectedMajor, selectedPreVetEducationType, preVetEducation, setPreVetEducation, setSelectedPreVetSchool, setSelectedMajor, setSelectedPreVetEducationType, startYear, endYear)}>Add</Button>
                  )}              
                  </>
                )}
          <ul>
            {preVetEducation.map((pre_vet_education) => (
              <li key={pre_vet_education.specialties_listID}>
                {pre_vet_education.School_name}, {pre_vet_education.Major_name}, {pre_vet_education.Education_type}{" "}
                <Button onClick={() => handleDeletePreVetEducation(pre_vet_education, preVetEducation, setPreVetEducation)}>X</Button>
              </li>
            ))}
          </ul>
          <Button onClick={()=>savePreVetSchool(preVetEducation, listDetails)}>Save</Button>
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
    return(
      <Form> 
      <FormGroup
          id="Description" 
          value={description.Description} 
          onChange = {event => handleDescriptionChange(event, setDescription, setIsDescriptionOverLimit)}
          maxLength={1000} // limit to 1000 characters
          as="textarea" 
          rows={3}
          label={"Description"}
        />
          <div style={counterStyle}>Character Limit: {description.Description ? (<>{description.Description.length}</>):(<>0</>)} / 1000</div>
        <div className="d-grid justify-content-md-end">
      <Button onClick={()=> saveDescription(description)}>Save</Button>
      </div>
    </Form>
      )
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
      <Carousel activeIndex={carouselIndex} onSelect={()=>handleSelectCarousel(carouselIndex, setCarouselIndex)}>
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
                onChange={event => handleSelectSpecialty(event, listDetails, setSelectedSpecialties)}
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
              <Button onClick={()=> handleAddSpecialty(selectedSpecialty, doctorSpecialties, setDoctorSpecialties, setSelectedSpecialties)}>Add</Button>
            </>
          )}
          <ul>
            {doctorSpecialties.map((specialty) => (
              <li key={specialty.specialties_listID}>
                {specialty.Organization_name} - {specialty.Specialty_name}{" "}
                <Button onClick={() => handleDeleteSpecialty(specialty, doctorSpecialties, setDoctorSpecialties)}>X</Button>
              </li>
            ))}
          </ul>
          <Button onClick={() => saveSpecialies(doctorSpecialties)}>Save</Button>
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
        <select 
          id="insurance" 
          name="insurance" 
          value = {selectedInsurance?.insurance_listID || ''} 
          onChange = {event => handleInsuranceChange(event, listDetails, setSelectedInsurance)}>
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
      <Button onClick={() => handleAddInsurance(selectedInsurance, acceptedInsurances, setAcceptedInsurances, setSelectedInsurance)}>Add</Button>
      <ul>
        {Array.isArray(acceptedInsurances) && 
          acceptedInsurances.map(insurance => (
            <li key={insurance.insurance_listID}>
              {insurance.Insurance_name} 
              <Button onClick={() => handleDeleteInsurance(insurance, acceptedInsurances, setAcceptedInsurances)}>x</Button>
            </li>
          ))}
      </ul>
      <Button onClick={()=>saveInsurances(acceptedInsurances)}>Save</Button>
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
          onChange={event =>handleLanguageChange(event, listDetails, setSelectedLanguage)}
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
        <Button onClick={()=>handleAddLanguage(selectedLanguage, spokenLanguages, setSpokenLanguages, setSelectedLanguage)}>Add</Button>
        <ul>
          {Array.isArray(spokenLanguages) &&
            spokenLanguages.map((language) => (
              <li key={language.language_listID}>
                {language.Language_name}
                <Button onClick={() => handleDeleteLanguage(language, spokenLanguages, setSpokenLanguages)}>x</Button>
              </li>
            ))}
        </ul>
        <Button onClick={() => saveLanguages(spokenLanguages)}>Save</Button>
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
          <ToggleButtonGroup type="radio" name="options" 
          value={publiclyAvailable ?? 0} 
          onChange={(value)=>handlePublicAvailibilityToggle(value, setPubliclyAvailable)}>
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
      {/* {renderPicturesSection()}
      <br/> */}
      {renderSpecialtySection()}
      <br/>
      {renderInsuranceSection()}
      <br/>
      {renderLanguageSection()}
      <br/>
      {renderLocationsSection()}
      <br/>
      {renderVerificationAndPublicStatusSection()}
  </div>
  )
};
