import React, {useEffect, useContext, useState} from 'react'
import { VerifyContext } from '../../../Contexts/VerifyContext.js';
import DoctorHeader from '../doctor-header.js';
import PrivateDoctorDataService from '../../../Services/private-doctor-data-service.js';
import Header from '../../header.js';
import { NonDoctorAccess } from '../../../Components/user-type-unauth.js';
import { useConfirmationTimeout } from '../../../Custom Hooks/Hooks for Doctor Account Details/savedMessageUseEffect.js';
import RenderPreVetEducationSection from './preVetEducation.js';
import RenderVetEducationSection from './vetEducation.js';
import RenderDescriptionSection from './description.js';
//import RenderPicturesSection from './pictures.js';
import RenderVerificationAndPublicStatusSection from './verificationAndPublicStatus.js';
import RenderPersonalInfoLinkSection from './personalInfoLink.js';
import RenderInsuranceSection from './insurance.js';
import RenderLanguageSection from './language.js';
import RenderServiceSection from './service.js';
import RenderLocationSection from './location.js';
import RenderSpecialtySection from './specialty.js';

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
  //const [carouselIndex, setCarouselIndex] = useState(0);
  const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails"));
  
  const [acceptedInsurances, setAcceptedInsurances] = useState(DoctorAccountDetails?.[0] || []);

  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [spokenLanguages, setSpokenLanguages] = useState(DoctorAccountDetails?.[1] || []);
  
  const [selectedServices, setSelectedServices] = useState(DoctorAccountDetails?.[2] || []);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const [selectedOrganization, setSelectedOrganization] = useState('');
  const [selectedSpecialty, setSelectedSpecialties] = useState('');
  const [doctorSpecialties, setDoctorSpecialties] = useState(DoctorAccountDetails?.[3] || []);

  const [selectedPreVetSchool, setSelectedPreVetSchool] = useState('');
  const [selectedMajor, setSelectedMajor] = useState('');
  const [selectedPreVetEducationType, setSelectedPreVetEducationType] = useState('');
  const [preVetEducation, setPreVetEducation] = useState(DoctorAccountDetails?.[4] || []);

  const [selectedVetSchool, setSelectedVetSchool] = useState('');
  const [selectedVetEducationType, setSelectedVetEducationType] = useState('');
  const [vetEducation, setVetEducation] = useState(DoctorAccountDetails?.[5] || []);

  const [addresses, setAddresses] = useState(DoctorAccountDetails?.[6] ||[{ address_priority: 0, addresses_ID: 0, address_title: '', address_line_1  : '', address_line_2: '', city: '', state: '', zip: '', country: '', phone: ''}]);

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

  const [showSavedLocationMessage, setShowSavedLocationMessage] = useState(false);

  //Should make this into one state:
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
    setShowSavedServicesMessage,
    showSavedLocationMessage,
    setShowSavedLocationMessage
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
              setAddresses(response.data[6])
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

  return (
    <div>
      <Header dropdown = {true}/>
      <DoctorHeader/>
      <p>This is the Account Details Page</p>
      <RenderPreVetEducationSection
        listDetails = {listDetails}
        selectedPreVetSchool = {selectedPreVetSchool}
        setSelectedPreVetSchool = {setSelectedPreVetSchool}
        selectedMajor = {selectedMajor}
        setSelectedMajor = {setSelectedMajor}
        selectedPreVetEducationType = {selectedPreVetEducationType}
        setSelectedPreVetEducationType = {setSelectedPreVetEducationType}
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
        listDetails = {listDetails}
        selectedVetSchool = {selectedVetSchool}
        setSelectedVetSchool = {setSelectedVetSchool}
        selectedVetEducationType = {selectedVetEducationType}
        setSelectedVetEducationType = {setSelectedVetEducationType}
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
      <RenderDescriptionSection
        description = {description}
        setDescription = {setDescription}
        setIsDescriptionOverLimit = {setIsDescriptionOverLimit}
        counterStyle = {counterStyle}
        showSavedDescriptionMessage = {showSavedDescriptionMessage}
        setShowSavedDescriptionMessage = {setShowSavedDescriptionMessage}
      />
      <br/>
      <RenderPersonalInfoLinkSection/>
      <br/>
      {/* <RenderPicturesSection
        carouselIndex = {carouselIndex}
        setCarouselIndex = {setCarouselIndex}
      />
      <br/> */}
      <RenderSpecialtySection 
        listDetails = {listDetails}
        selectedOrganization = {selectedOrganization}
        setSelectedOrganization = {setSelectedOrganization}
        selectedSpecialty = {selectedSpecialty}
        setSelectedSpecialties = {setSelectedSpecialties}
        specialties = {specialties}
        doctorSpecialties = {doctorSpecialties}
        setDoctorSpecialties = {setDoctorSpecialties}
        setShowSavedSpecialtiesMessage = {setShowSavedSpecialtiesMessage}
      />
      <br/>
      <RenderInsuranceSection
        listDetails = {listDetails}
        acceptedInsurances = {acceptedInsurances}
        setAcceptedInsurances = {setAcceptedInsurances}
        showSavedInsurancesMessage = {showSavedInsurancesMessage}
        setShowSavedInsurancesMessage = {setShowSavedInsurancesMessage}
      />
      <br/>
      <RenderLanguageSection
        listDetails = {listDetails}
        selectedLanguage = {selectedLanguage}
        setSelectedLanguage = {setSelectedLanguage}
        spokenLanguages = {spokenLanguages}
        setSpokenLanguages = {setSpokenLanguages}
        showSavedLanguagesMessage = {showSavedLanguagesMessage}
        setShowSavedLanguagesMessage = {setShowSavedLanguagesMessage}
      />
      <br/>
      <RenderServiceSection
        listDetails = {listDetails}
        selectedCategories = {selectedCategories}
        setSelectedCategories = {setSelectedCategories}
        selectedServices = {selectedServices}
        setSelectedServices = {setSelectedServices}
        expandedCategories = {expandedCategories}
        setExpandedCategories = {setExpandedCategories}
        setShowSavedServicesMessage = {setShowSavedServicesMessage}
      />
      <br />
      <RenderLocationSection
        listDetails = {listDetails}
        addresses = {addresses}
        setAddresses = {setAddresses}
        showSavedLocationMessage = {showSavedLocationMessage}
        setShowSavedLocationMessage = {setShowSavedLocationMessage}
      />
      <br/>
      <RenderVerificationAndPublicStatusSection
        publiclyAvailable = {publiclyAvailable}
        setPubliclyAvailable = {setPubliclyAvailable}
        verified = {verified}
      />
  </div>
  )
};
