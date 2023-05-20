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
  const [showSavedInsurancesMessage, setShowSavedInsurancesMessage] = useState(false);
  const [showSameInsurancesMessage , setShowSameInsurancesMessage ] = useState(false);
  const [showSaveInsurancesProblemMessage, setshowSaveInsurancesProblemMessage] = useState(false);

  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [spokenLanguages, setSpokenLanguages] = useState(DoctorAccountDetails?.[1] || []);
  const [showSavedLanguagesMessage, setShowSavedLanguagesMessage] = useState(false);
  const [showSameLanguagesMessage, setShowSameLanguagesMessage] = useState(false);
  const [showSaveLanguagesProblemMessage, setShowSaveLanguagesProblemMessage] = useState(false);

  const [selectedServices, setSelectedServices] = useState(DoctorAccountDetails?.[2] || []);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState([]);
  const [showSavedServicesMessage, setShowSavedServicesMessage] = useState(false);
  const [showSameServicesMessage, setShowSameServicesMessage] = useState(false);
  const [showSaveServicesProblemMessage, setShowSaveServicesProblemMessage] = useState(false);
  
  const [selectedOrganization, setSelectedOrganization] = useState('');
  const [selectedSpecialty, setSelectedSpecialties] = useState('');
  const [doctorSpecialties, setDoctorSpecialties] = useState(DoctorAccountDetails?.[3] || []);
  const [showSavedSpecialtiesMessage, setShowSavedSpecialtiesMessage] = useState(false);
  const [showSameSpecialtiesMessage, setShowSameSpecialtiesMessage] = useState(false);
  const [showSaveSpecialtiesProblemMessage, setShowSaveSpecialtiesProblemMessage] = useState(false);

  const [selectedPreVetSchool, setSelectedPreVetSchool] = useState('');
  const [selectedMajor, setSelectedMajor] = useState('');
  const [selectedPreVetEducationType, setSelectedPreVetEducationType] = useState('');
  const [preVetEducation, setPreVetEducation] = useState(DoctorAccountDetails?.[4] || []);
  const [showSavedPreVetMessage, setShowSavedPreVetMessage] = useState(false);
  const [showSamePreVetMessage, setShowSamePreVetMessage] = useState(false);
  const [showSavePreVetProblemMessage, setShowSavePreVetProblemMessage] = useState(false);

  const [selectedVetSchool, setSelectedVetSchool] = useState('');
  const [selectedVetEducationType, setSelectedVetEducationType] = useState('');
  const [vetEducation, setVetEducation] = useState(DoctorAccountDetails?.[5] || []);
  const [showSavedVetMessage, setShowSavedVetMessage] = useState(false);
  const [showSameVetMessage, setShowSameVetMessage] = useState(false);
  const [showSaveVetProblemMessage, setShowSaveVetProblemMessage] = useState(false);

  const [addresses, setAddresses] = useState(DoctorAccountDetails?.[6] ||[{ address_priority: 0, addresses_ID: 0, address_title: '', address_line_1  : '', address_line_2: '', city: '', state: '', zip: '', country: '', phone_priority: 0, phone: ''}]);
  const [showSavedLocationsMessage, setShowSavedLocationsMessage] = useState(false);
  const [showSameLocationsMessage, setShowSameLocationsMessage] = useState(false);
  const [showSaveLocationsProblemMessage, setShowSaveLocationsProblemMessage] = useState(false);

  const [isDescriptionOverLimit, setIsDescriptionOverLimit] = useState(false);
  const [description, setDescription] = useState(DoctorAccountDetails?.[7] || {});
  const [showSavedDescriptionMessage, setShowSavedDescriptionMessage] = useState(false);
  const [showSameDescriptionMessage, setShowSameDescriptionMessage] = useState(false);
  const [showSaveDescriptionProblemMessage, setShowSaveDescriptionProblemMessage] = useState(false);

  const [publiclyAvailable, setPubliclyAvailable] = useState(DoctorAccountDetails?.[9][0]?.PubliclyAvailable || 0);
  const verified = DoctorAccountDetails?.[9][0].Verified || [];

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
    showSavedInsurancesMessage, setShowSavedInsurancesMessage, 
    showSameInsurancesMessage, setShowSameInsurancesMessage, 
    showSaveInsurancesProblemMessage, setshowSaveInsurancesProblemMessage,
    
    showSavedLanguagesMessage, setShowSavedLanguagesMessage, 
    showSameLanguagesMessage, setShowSameLanguagesMessage, 
    showSaveLanguagesProblemMessage, setShowSaveLanguagesProblemMessage,
    
    showSavedServicesMessage, setShowSavedServicesMessage, 
    showSameServicesMessage, setShowSameServicesMessage, 
    showSaveServicesProblemMessage, setShowSaveServicesProblemMessage,
    
    showSavedSpecialtiesMessage, setShowSavedSpecialtiesMessage, 
    showSameSpecialtiesMessage, setShowSameSpecialtiesMessage, 
    showSaveSpecialtiesProblemMessage, setShowSaveSpecialtiesProblemMessage,
    
    showSavedPreVetMessage, setShowSavedPreVetMessage, 
    showSamePreVetMessage, setShowSamePreVetMessage, 
    showSavePreVetProblemMessage, setShowSavePreVetProblemMessage,
    
    showSavedVetMessage, setShowSavedVetMessage, 
    showSameVetMessage, setShowSameVetMessage, 
    showSaveVetProblemMessage, setShowSaveVetProblemMessage,
    
    showSavedLocationsMessage, setShowSavedLocationsMessage, 
    showSameLocationsMessage, setShowSameLocationsMessage, 
    showSaveLocationsProblemMessage, setShowSaveLocationsProblemMessage,
    
    showSavedDescriptionMessage, setShowSavedDescriptionMessage, 
    showSameDescriptionMessage, setShowSameDescriptionMessage, 
    showSaveDescriptionProblemMessage, setShowSaveDescriptionProblemMessage,  
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
              //console.log(response.data[2])
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
        showSamePreVetMessage = {showSamePreVetMessage}
        setShowSamePreVetMessage = {setShowSamePreVetMessage}
        showSavePreVetProblemMessage = {showSavePreVetProblemMessage}
        setShowSavePreVetProblemMessage = {setShowSavePreVetProblemMessage}
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
        showSameVetMessage = {showSameVetMessage}
        setShowSameVetMessage = {setShowSameVetMessage}
        showSaveVetProblemMessage = {showSaveVetProblemMessage}
        setShowSaveVetProblemMessage = {setShowSaveVetProblemMessage}
      />
      <br/>
      <RenderDescriptionSection
        description = {description}
        setDescription = {setDescription}
        isDescriptionOverLimit = {isDescriptionOverLimit}
        setIsDescriptionOverLimit = {setIsDescriptionOverLimit}
        showSavedDescriptionMessage = {showSavedDescriptionMessage}
        setShowSavedDescriptionMessage = {setShowSavedDescriptionMessage}
        showSameDescriptionMessage = {showSameDescriptionMessage}
        setShowSameDescriptionMessage = {setShowSameDescriptionMessage}
        showSaveDescriptionProblemMessage = {showSaveDescriptionProblemMessage}
        setShowSaveDescriptionProblemMessage = {setShowSaveDescriptionProblemMessage}
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
        doctorSpecialties = {doctorSpecialties}
        setDoctorSpecialties = {setDoctorSpecialties}
        showSavedSpecialtiesMessage = {showSavedSpecialtiesMessage}
        setShowSavedSpecialtiesMessage = {setShowSavedSpecialtiesMessage}
        showSameSpecialtiesMessage = {showSameSpecialtiesMessage}
        setShowSameSpecialtiesMessage = {setShowSameSpecialtiesMessage}
        showSaveSpecialtiesProblemMessage = {showSaveSpecialtiesProblemMessage}
        setShowSaveSpecialtiesProblemMessage = {setShowSaveSpecialtiesProblemMessage}
      />
      <br/>
      <RenderInsuranceSection
        listDetails = {listDetails}
        acceptedInsurances = {acceptedInsurances}
        setAcceptedInsurances = {setAcceptedInsurances}
        showSavedInsurancesMessage = {showSavedInsurancesMessage}
        setShowSavedInsurancesMessage = {setShowSavedInsurancesMessage}
        showSameInsurancesMessage = {showSameInsurancesMessage}
        setShowSameInsurancesMessage = {setShowSameInsurancesMessage}
        showSaveInsurancesProblemMessage = {showSaveInsurancesProblemMessage}
        setshowSaveInsurancesProblemMessage = {setshowSaveInsurancesProblemMessage}
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
        showSameLanguagesMessage = {showSameLanguagesMessage}
        setShowSameLanguagesMessage = {setShowSameLanguagesMessage}
        showSaveLanguagesProblemMessage = {showSaveLanguagesProblemMessage}
        setShowSaveLanguagesProblemMessage = {setShowSaveLanguagesProblemMessage}
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
        showSavedServicesMessage = {showSavedServicesMessage}
        setShowSavedServicesMessage = {setShowSavedServicesMessage}
        showSameServicesMessage = {showSameServicesMessage}
        setShowSameServicesMessage = {setShowSameServicesMessage}
        showSaveServicesProblemMessage = {showSaveServicesProblemMessage}
        setShowSaveServicesProblemMessage = {setShowSaveServicesProblemMessage}
      />
      <br />
      <RenderLocationSection
        listDetails = {listDetails}
        addresses = {addresses}
        setAddresses = {setAddresses}
        showSavedLocationsMessage = {showSavedLocationsMessage}
        setShowSavedLocationsMessage = {setShowSavedLocationsMessage}
        showSameLocationsMessage = {showSameLocationsMessage}
        setShowSameLocationsMessage = {setShowSameLocationsMessage}
        showSaveLocationsProblemMessage = {showSaveLocationsProblemMessage}
        setShowSaveLocationsProblemMessage = {setShowSaveLocationsProblemMessage}
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
