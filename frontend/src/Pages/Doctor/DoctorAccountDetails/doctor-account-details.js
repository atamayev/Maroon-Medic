import React, {useEffect, useContext, useState} from 'react'
import {Link} from "react-router-dom";
import {Button, Card, Form, Carousel, Accordion, ToggleButton, ToggleButtonGroup} from 'react-bootstrap';
import { VerifyContext } from '../../../Contexts/VerifyContext.js';
import DoctorHeader from '../doctor-header.js';
import PrivateDoctorDataService from '../../../Services/private-doctor-data-service.js';
import Header from '../../header.js';
import FormGroup from '../../../Components/form-group.js';
import { NonDoctorAccess } from '../../../Components/user-type-unauth.js';
import { handleLanguageChange, handleSelectSpecialty, handleDescriptionChange, handleSelectCarousel, handleCategoryChange, handleServiceChange, handleToggleCategory} from '../../../Custom Hooks/Hooks for Doctor Account Details/select.js';
import { handleAddLanguage, handleAddSpecialty, handleAddInsurance } from '../../../Custom Hooks/Hooks for Doctor Account Details/add.js';
import { handleDeleteInsurance, handleDeleteLanguage, handleDeleteSpecialty } from '../../../Custom Hooks/Hooks for Doctor Account Details/delete.js';
import { saveInsurances, saveLanguages, saveSpecialies, saveDescription, saveServices, handlePublicAvailibilityToggle } from '../../../Custom Hooks/Hooks for Doctor Account Details/save.js';
import { useConfirmationTimeout } from '../../../Custom Hooks/Hooks for Doctor Account Details/savedMessageUseEffect.js';
import RenderPreVetEducationSection from './preVetEducation.js';
import RenderVetEducationSection from './vetEducation.js';

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
  const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails"));
  
  const [acceptedInsurances, setAcceptedInsurances] = useState(DoctorAccountDetails?.[0] || []);

  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [spokenLanguages, setSpokenLanguages] = useState(DoctorAccountDetails?.[1] || []);

  const [selectedOrganization, setSelectedOrganization] = useState('');
  const [selectedSpecialty, setSelectedSpecialties] = useState('');
  const [doctorSpecialties, setDoctorSpecialties] = useState(DoctorAccountDetails?.[3] || []);

  const [selectedServices, setSelectedServices] = useState(DoctorAccountDetails?.[2] || []);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const [selectedPreVetSchool, setSelectedPreVetSchool] = useState('');
  const [selectedMajor, setSelectedMajor] = useState('');
  const [selectedPreVetEducationType, setSelectedPreVetEducationType] = useState('');
  const [preVetEducation, setPreVetEducation] = useState(DoctorAccountDetails?.[4] || []);

  const [selectedVetSchool, setSelectedVetSchool] = useState('');
  const [selectedVetEducationType, setSelectedVetEducationType] = useState('');
  const [vetEducation, setVetEducation] = useState(DoctorAccountDetails?.[5] || []);

  const [isDescriptionOverLimit, setIsDescriptionOverLimit] = useState(false);
  const [description, setDescription] = useState(DoctorAccountDetails?.[7] || {});

  const verified = DoctorAccountDetails?.[9][0].Verified || [];
  const [publiclyAvailable, setPubliclyAvailable] = useState(DoctorAccountDetails?.[9][0]?.PubliclyAvailable || 0);

  const [expandedCategories, setExpandedCategories] = useState([]);

  const [showSavedPreVetMessage, setShowSavedPreVetMessage] = useState(false);

  const [showSavedVetMessage, setShowSavedVetMessage] = useState(false);

  const [showSavedDescriptionMessage, setShowSavedDescriptionMessage] = useState(false);

  const [showSavedSpecialtiesMessage, setShowSavedSpecialtiesMessage] = useState(false);

  const [showSavedInsurancesMessage, setShowSavedInsurancesMessage] = useState(false);

  const [showSavedLanguagesMessage, setShowSavedLanguagesMessage] = useState(false);

  const [showSavedServicesMessage, setShowSavedServicesMessage] = useState(false);

  const [startYear, setStartYear] = useState(1923);
  const [endYear, setEndYear] = useState(1923);
  const [startMonth, setStartMonth] = useState('January');
  const [endMonth, setEndMonth] = useState('January');

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

  useConfirmationTimeout(
    showSavedPreVetMessage,
    setShowSavedPreVetMessage,
    showSavedVetMessage,
    setShowSavedVetMessage,
    showSavedDescriptionMessage,
    setShowSavedDescriptionMessage,
    showSavedSpecialtiesMessage,
    setShowSavedSpecialtiesMessage,
    showSavedInsurancesMessage,
    setShowSavedInsurancesMessage,
    showSavedLanguagesMessage,
    setShowSavedLanguagesMessage,
    showSavedServicesMessage,
    setShowSavedServicesMessage
  );

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
            if(response.data[2]){
              console.log(response.data[2])
              setSelectedServices(response.data[2])
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
              //Set Address Data
            }
            if(response.data[7] && Object.keys(response.data[7]).length > 0){
              setDescription(response.data[7]);
              if(response.data[7].Description.length === 1000){
                setIsDescriptionOverLimit(true);
              }
            }
            if(response.data[8]){
              //Somehow set pictures.
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
        />
          <div style={counterStyle}>Character Limit: {description.Description ? (<>{description.Description.length}</>):(<>0</>)} / 1000</div>
      <Button onClick={()=> saveDescription(description, setShowSavedDescriptionMessage)}>Save</Button>
      <span className={`fade ${showSavedDescriptionMessage ? 'show' : ''}`}>  Description saved!</span>
    </Form>
      )
  }

  const renderDescriptionSection = () =>{
    return(
      <Card>
        <Card.Header>
          Description
        </Card.Header>
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
          Looking to edit your Profile Information? {''} 
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
          <Button onClick={() => saveSpecialies(doctorSpecialties, setShowSavedSpecialtiesMessage)}>Save</Button>
          <span className={`fade ${showSavedSpecialtiesMessage ? 'show' : ''}`}>  Specialties saved!</span>
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
        <Card.Header>
            Specialties
        </Card.Header>
        <Card.Body>
          {renderIsSpecialty()}
        </Card.Body>
      </Card>
    )
  }

  const renderInsuranceSection = () => {
    return (
      <Card>
        <Card.Header>
          Insurances
        </Card.Header>
        <Card.Body>
          {Array.isArray(listDetails[0]) &&
            listDetails[0].length > 0 &&
            listDetails[0].map((insurance) => (
              <div key={insurance?.insurance_listID}>
                <input
                  type="checkbox"
                  id={insurance?.insurance_listID}
                  name="insurance"
                  value={insurance?.insurance_listID}
                  checked={acceptedInsurances.find((accepted) => accepted.insurance_listID === insurance.insurance_listID) !== undefined}
                  onChange={(event) => {
                    if (event.target.checked) {
                      handleAddInsurance(insurance, acceptedInsurances, setAcceptedInsurances);
                    } else {
                      handleDeleteInsurance(insurance, acceptedInsurances, setAcceptedInsurances);
                    }
                  }}
                />
                <label htmlFor={insurance?.insurance_listID}>{insurance?.Insurance_name}</label>
              </div>
            ))}
          <Button onClick={() => saveInsurances(acceptedInsurances, setShowSavedInsurancesMessage)}>Save</Button>
          <span className={`fade ${showSavedInsurancesMessage ? 'show' : ''}`}>  Insurances saved!</span>
        </Card.Body>
      </Card>
    );
  };
  
  const renderLanguageSection = () =>{
    return(
      <Card>
        <Card.Header>
          Languages
        </Card.Header>
        <Card.Body>
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
        <Button onClick={() => saveLanguages(spokenLanguages, setShowSavedLanguagesMessage)}>Save</Button>
        <span className={`fade ${showSavedLanguagesMessage ? 'show' : ''}`}>  Languages saved!</span>
        </Card.Body>
      </Card>
    )
  }

  const renderLocationsSection = () =>{
    return(
      <Card>
        <Card.Header>
          Locations
        </Card.Header>
      <Card.Body>
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
  
  const renderIsVetServices = () => {
    // console.log('selectedServices',selectedServices)
    const categories = {};
    if (listDetails[2]) {
      listDetails[2].forEach(service => {
        if (!categories[service.Category_name]) {
          categories[service.Category_name] = [];
        }
        categories[service.Category_name].push(service);
      });
    }
  
    if (Array.from(new Set(listDetails[2]?.map((item) => item.Category_name))).length) {
      return (
        <>
          {Object.entries(categories).map(([category, services]) => (
            <div key={category} style={{ marginBottom: '10px' }}>
              <input
                type="checkbox"
                id={category}
                name="category"
                checked={selectedCategories.includes(category)}
                onChange={event => handleCategoryChange(event, category, services, selectedCategories, setSelectedCategories, selectedServices, setSelectedServices, expandedCategories, setExpandedCategories)}
              />
              <label htmlFor={category}>{category}</label>
              {services.length > 1 && (
                <Button onClick={() => handleToggleCategory(category, setExpandedCategories)}>Toggle</Button>
              )}
              {(services.length <= 1 || expandedCategories.includes(category)) && (
                <div>
                  {services.map(service => (
                    <div key={service.service_and_category_listID} style={{ paddingLeft: '20px' }}>
                      <input
                        type="checkbox"
                        id={`${category}-${service.service_and_category_listID}`}
                        name="service"
                        checked={selectedServices.find(s => s.service_and_category_listID === service.service_and_category_listID) !== undefined}
                        onChange={event => handleServiceChange(event, service, selectedServices, setSelectedServices)}
                      />
                      <label htmlFor={`${category}-${service.service_and_category_listID}`}>{service.Service_name}</label>
                      {selectedServices.find(s => s.service_and_category_listID === service.service_and_category_listID) && (
                        <>
                          <input
                            type="number"
                            placeholder="Service Time"
                            id={`time-${service.service_and_category_listID}`}
                            required
                          />
                          <input
                            type="number"
                            placeholder="Service Price"
                            id={`price-${service.service_and_category_listID}`}
                          />
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Button onClick={() => saveServices(selectedServices, setShowSavedServicesMessage)}>Save</Button>
        </>
      )
    }
  }
  
  const renderServicesSection = () =>{
    return(
      <Card>
      <Card.Header>
        Vet Services
      </Card.Header>
      <Card.Body>
        {renderIsVetServices()}
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
      <RenderPreVetEducationSection
        selectedPreVetSchool = {selectedPreVetSchool}
        setSelectedPreVetSchool = {setSelectedPreVetSchool}
        selectedMajor = {selectedMajor}
        setSelectedMajor = {setSelectedMajor}
        selectedPreVetEducationType = {selectedPreVetEducationType}
        setSelectedPreVetEducationType = {setSelectedPreVetEducationType}
        listDetails = {listDetails}
        startMonth= {startMonth} 
        setStartMonth = {setStartMonth}
        endMonth = {endMonth} 
        setEndMonth = {setEndMonth}
        startYear = {startYear} 
        setStartYear = {setStartYear}
        endYear = {endYear} 
        setEndYear = {setEndYear}
        preVetEducation = {preVetEducation}
        setPreVetEducation = {setPreVetEducation}
        showSavedPreVetMessage = {showSavedPreVetMessage}
        setShowSavedPreVetMessage = {setShowSavedPreVetMessage}
      />
      <br/>
      <RenderVetEducationSection 
        selectedVetSchool = {selectedVetSchool}
        setSelectedVetSchool = {setSelectedVetSchool}
        selectedVetEducationType = {selectedVetEducationType}
        setSelectedVetEducationType = {setSelectedVetEducationType}
        listDetails = {listDetails}
        startMonth= {startMonth} 
        setStartMonth = {setStartMonth}
        endMonth = {endMonth} 
        setEndMonth = {setEndMonth}
        startYear = {startYear} 
        setStartYear = {setStartYear}
        endYear = {endYear} 
        setEndYear = {setEndYear}
        vetEducation = {vetEducation}
        setVetEducation = {setVetEducation}
        showSavedVetMessage = {showSavedVetMessage}
        setShowSavedVetMessage = {setShowSavedVetMessage}
      />
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
      {renderServicesSection()}
      <br />
      {renderLocationsSection()}
      <br/>
      {renderVerificationAndPublicStatusSection()}
  </div>
  )
};
