import React, {useEffect, useContext, useState} from 'react'
import { VerifyContext } from '../../../Contexts/VerifyContext.js';
import DoctorHeader from '../doctor-header.js';
import PrivateDoctorDataService from '../../../Services/private-doctor-data-service.js';
import Header from '../../header.js';
import { NonDoctorAccess } from '../../../Components/user-type-unauth.js';
import { useConfirmationMessage } from '../../../Custom Hooks/useConfirmationMessage.js';
import RenderPreVetEducationSection from './pre-vet-education.js';
import RenderVetEducationSection from './vet-education.js';
import RenderDescriptionSection from './description.js';
//import RenderPicturesSection from './pictures.js';
import RenderVerificationAndPublicStatusSection from './verification-and-public-status.js';
import RenderPersonalInfoLinkSection from './personalInfoLink.js';
import RenderLanguageSection from './language.js';
import RenderServiceSection from './service.js';
import RenderLocationSection from './location.js';
import RenderSpecialtySection from './specialty.js';

async function FillLists(setListDetails){ 
  // this will be used to fill the lists in the db (languages, specialites, etc.) Should be one function that returns an object of arrays of hte different lists
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

  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [spokenLanguages, setSpokenLanguages] = useState(DoctorAccountDetails?.[1] || []);
  const [languagesConfirmation, setLanguagesConfirmation] = useConfirmationMessage();

  const [providedServices, setProvidedServices] = useState(DoctorAccountDetails?.[2] || []);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState([]);
  const [servicesConfirmation, setServicesConfirmation] = useConfirmationMessage();

  const [selectedOrganization, setSelectedOrganization] = useState('');
  const [selectedSpecialty, setSelectedSpecialties] = useState('');
  const [doctorSpecialties, setDoctorSpecialties] = useState(DoctorAccountDetails?.[3] || []);
  const [specialtiesConfirmation, setSpecialtiesConfirmation] = useConfirmationMessage();

  const [selectedPreVetSchool, setSelectedPreVetSchool] = useState('');
  const [selectedMajor, setSelectedMajor] = useState('');
  const [selectedPreVetEducationType, setSelectedPreVetEducationType] = useState('');
  const [preVetEducation, setPreVetEducation] = useState(DoctorAccountDetails?.[4] || []);
  const [preVetEducationConfirmation, setPreVetEducationConfirmation] = useConfirmationMessage();

  const [selectedVetSchool, setSelectedVetSchool] = useState('');
  const [selectedVetEducationType, setSelectedVetEducationType] = useState('');
  const [vetEducation, setVetEducation] = useState(DoctorAccountDetails?.[5] || []);
  const [vetEducationConfirmation, setVetEducationConfirmation] = useConfirmationMessage();

  const [addresses, setAddresses] = useState(DoctorAccountDetails?.[6] ||[{ address_priority: 0, addressesID: 0, address_title: '', address_line_1  : '', address_line_2: '', city: '', state: '', zip: '', country: '', phone_priority: 0, phone: '', address_public_status: 1, instant_book: 0, times:[]}]);
  const [addressesConfirmation, setAddressesConfirmation] = useConfirmationMessage();

  const [isDescriptionOverLimit, setIsDescriptionOverLimit] = useState(false);
  const [description, setDescription] = useState(DoctorAccountDetails?.[7] || {});
  const [descriptionConfirmation, setDescriptionConfirmation] = useConfirmationMessage();

  const [publiclyAvailable, setPubliclyAvailable] = useState(DoctorAccountDetails?.[9][0]?.PubliclyAvailable || 0);
  const verified = DoctorAccountDetails?.[9][0].Verified || [];
  const [publiclyAvailableConfirmation, setPubliclyAvailableConfirmation] = useConfirmationMessage();

  const currentYear = new Date().getFullYear();

  const [timeState, setTimeState] = useState({
    startMonth: 'January', 
    endMonth: 'January', 
    startYear: currentYear, 
    endYear: currentYear,
  });

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
            }else{
              setExpandedCategories(JSON.parse(storedAccountDetails)[2]?.map(service => service.Category_name))
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
            if(response.data[1]) setSpokenLanguages(response.data[1]);
            if(response.data[2]){
              setProvidedServices(response.data[2])
              setExpandedCategories(response.data[2].map(service => service.Category_name));
            }
            if(response.data[3]) setDoctorSpecialties(response.data[3]);
            if(response.data[4]) setPreVetEducation(response.data[4]);
            if(response.data[5]) setVetEducation(response.data[5]);
            if(response.data[6]) setAddresses(response.data[6]);
            if(response.data[7] && Object.keys(response.data[7]).length > 0){
              setDescription(response.data[7]);
              if(response.data[7].Description.length === 1000){
                setIsDescriptionOverLimit(true);
              }
            }
            if(response.data[8]){
              //Somehow set pictures.
            }
            if(response.data[9][0].PubliclyAvailable) setPubliclyAvailable(response.data[9][0].PubliclyAvailable);
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
      <RenderPreVetEducationSection
        listDetails = {listDetails}
        selectedPreVetSchool = {selectedPreVetSchool}
        setSelectedPreVetSchool = {setSelectedPreVetSchool}
        selectedMajor = {selectedMajor}
        setSelectedMajor = {setSelectedMajor}
        selectedPreVetEducationType = {selectedPreVetEducationType}
        setSelectedPreVetEducationType = {setSelectedPreVetEducationType}
        timeState = {timeState}
        setTimeState = {setTimeState}
        preVetEducation = {preVetEducation}
        setPreVetEducation = {setPreVetEducation}
        preVetEducationConfirmation = {preVetEducationConfirmation}
        setPreVetEducationConfirmation = {setPreVetEducationConfirmation}
      />
      <RenderVetEducationSection
        listDetails = {listDetails}
        selectedVetSchool = {selectedVetSchool}
        setSelectedVetSchool = {setSelectedVetSchool}
        selectedVetEducationType = {selectedVetEducationType}
        setSelectedVetEducationType = {setSelectedVetEducationType}
        timeState = {timeState}
        setTimeState = {setTimeState}
        vetEducation = {vetEducation}
        setVetEducation = {setVetEducation}
        vetEducationConfirmation = {vetEducationConfirmation}
        setVetEducationConfirmation = {setVetEducationConfirmation}
      />
      <RenderDescriptionSection
        description = {description}
        setDescription = {setDescription}
        isDescriptionOverLimit = {isDescriptionOverLimit}
        setIsDescriptionOverLimit = {setIsDescriptionOverLimit}
        descriptionConfirmation = {descriptionConfirmation}
        setDescriptionConfirmation = {setDescriptionConfirmation}
      />
      <RenderPersonalInfoLinkSection/>
      {/* <RenderPicturesSection
        carouselIndex = {carouselIndex}
        setCarouselIndex = {setCarouselIndex}
      /> */}
      <RenderSpecialtySection 
        listDetails = {listDetails}
        selectedOrganization = {selectedOrganization}
        setSelectedOrganization = {setSelectedOrganization}
        selectedSpecialty = {selectedSpecialty}
        setSelectedSpecialties = {setSelectedSpecialties}
        doctorSpecialties = {doctorSpecialties}
        setDoctorSpecialties = {setDoctorSpecialties}
        specialtiesConfirmation = {specialtiesConfirmation}
        setSpecialtiesConfirmation = {setSpecialtiesConfirmation}
      />
      <RenderLanguageSection
        listDetails = {listDetails}
        selectedLanguage = {selectedLanguage}
        setSelectedLanguage = {setSelectedLanguage}
        spokenLanguages = {spokenLanguages}
        setSpokenLanguages = {setSpokenLanguages}
        languagesConfirmation = {languagesConfirmation}
        setLanguagesConfirmation = {setLanguagesConfirmation}
      />
      <RenderServiceSection
        listDetails = {listDetails}
        selectedCategories = {selectedCategories}
        setSelectedCategories = {setSelectedCategories}
        providedServices = {providedServices}
        setProvidedServices = {setProvidedServices}
        expandedCategories = {expandedCategories}
        setExpandedCategories = {setExpandedCategories}
        servicesConfirmation = {servicesConfirmation}
        setServicesConfirmation = {setServicesConfirmation}
      />
      <RenderLocationSection
        listDetails = {listDetails}
        addresses = {addresses}
        setAddresses = {setAddresses}
        addressesConfirmation = {addressesConfirmation}
        setAddressesConfirmation = {setAddressesConfirmation}
      />
      <RenderVerificationAndPublicStatusSection
        publiclyAvailable = {publiclyAvailable}
        setPubliclyAvailable = {setPubliclyAvailable}
        verified = {verified}
        publiclyAvailableConfirmation = {publiclyAvailableConfirmation}
        setPubliclyAvailableConfirmation = {setPubliclyAvailableConfirmation}
      />
  </div>
  );
};
