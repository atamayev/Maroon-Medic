import React, {useEffect, useContext, useState} from 'react'
import { VerifyContext } from '../../../Contexts/VerifyContext.js';
import DoctorHeader from '../doctor-header.js';
import PrivateDoctorDataService from '../../../Services/private-doctor-data-service.js';
import Header from '../../header.js';
import { NonDoctorAccess } from '../../../Components/user-type-unauth.js';
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
import RenderPetsSection from './pets.js';
import _ from "lodash"
import { invalidUserAction } from '../../../Custom Hooks/user-verification-snippets.js';

async function FillLists(setListDetails) { 
  try {
    const response = await PrivateDoctorDataService.fillLists();
    if (response) {  
      setListDetails(response.data);
      sessionStorage.setItem("ListDetails", JSON.stringify(response.data));
    }
  } catch(error) {
    if (error.response.status === 401) invalidUserAction(error.response.data)
  }
}

export default function DoctorAccountDetails() {
  const [listDetails, setListDetails] = useState({});
  const {user_verification} = useContext(VerifyContext);
  const [user_type, setUser_type] = useState(null);
  //const [carouselIndex, setCarouselIndex] = useState(0);
  const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails"));

  const [spokenLanguages, setSpokenLanguages] = useState(DoctorAccountDetails?.[0] || []);

  const [providedServices, setProvidedServices] = useState(DoctorAccountDetails?.[1] || []);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState([]);

  const [selectedOrganization, setSelectedOrganization] = useState('');
  const [doctorSpecialties, setDoctorSpecialties] = useState(DoctorAccountDetails?.[2] || []);

  const [selectedPreVetSchool, setSelectedPreVetSchool] = useState('');
  const [selectedMajor, setSelectedMajor] = useState('');
  const [selectedPreVetEducationType, setSelectedPreVetEducationType] = useState('');
  const [preVetEducation, setPreVetEducation] = useState(DoctorAccountDetails?.[3] || []);

  const [selectedVetSchool, setSelectedVetSchool] = useState('');
  const [selectedVetEducationType, setSelectedVetEducationType] = useState('');
  const [vetEducation, setVetEducation] = useState(DoctorAccountDetails?.[4] || []);

  const [addresses, setAddresses] = useState(DoctorAccountDetails?.[5] ||[{ address_priority: 0, addressesID: 0, address_title: '', address_line_1  : '', address_line_2: '', city: '', state: '', zip: '', country: '', phone_priority: 0, phone: '', address_public_status: 1, instant_book: 0, times:[]}]);

  const [isDescriptionOverLimit, setIsDescriptionOverLimit] = useState(false);
  const [description, setDescription] = useState(DoctorAccountDetails?.[6] || {});

  const [servicedPets, setServicedPets] = useState(DoctorAccountDetails?.[7] || []);
  const [expandedPetTypes, setExpandedPetTypes] = useState([]);

  const [publiclyAvailable, setPubliclyAvailable] = useState(DoctorAccountDetails?.[8][0]?.PubliclyAvailable || 0);
  const verified = DoctorAccountDetails?.[8][0].Verified || [];

  const currentYear = new Date().getFullYear();

  const [timeState, setTimeState] = useState({
    startMonth: 'January', 
    endMonth: 'January', 
    startYear: currentYear, 
    endYear: currentYear,
  });

  useEffect(() => {
    user_verification()
    .then(result => {
      if (result.verified === true) {
        setUser_type(result.user_type)
        if (result.user_type === 'Doctor') {
          try {
            const storedAccountDetails = sessionStorage.getItem("DoctorAccountDetails")
            if (!storedAccountDetails) FillDoctorAccountDetails();
            else setExpandedCategories(JSON.parse(storedAccountDetails)[1]?.map(service => service.Category_name))
            
            const storedListDetails = sessionStorage.getItem("ListDetails")
            if (storedListDetails) setListDetails(JSON.parse(storedListDetails));
            else FillLists(setListDetails);
          } catch(error) {
          }
        }
      }
    })
    .catch(error => {
    });
  }, []);

  async function FillDoctorAccountDetails() {
    try {
      const response = await PrivateDoctorDataService.fillAccountDetails();
      if (response) {
        if (response.data[0]) setSpokenLanguages(response.data[0]);
        if (response.data[1]) {
          setProvidedServices(response.data[1])
          setExpandedCategories(response.data[1].map(service => service.Category_name));
        }
        if (response.data[2]) setDoctorSpecialties(response.data[2]);
        if (response.data[3]) setPreVetEducation(response.data[3]);
        if (response.data[4]) setVetEducation(response.data[4]);
        if (response.data[5]) setAddresses(response.data[5]);
        if (response.data[6] && !_.isEmpty(Object.keys(response.data[6]))) {
          setDescription(response.data[6]);
          if (response.data[6].Description.length === 1000) setIsDescriptionOverLimit(true);
        }
        if (response.data[7]) {
          setServicedPets(response.data[7])
          setExpandedPetTypes(response.data[7].map(pet =>pet.pet_type));
          //Somehow set pictures.
        }
        if (response.data[8][0].PubliclyAvailable) setPubliclyAvailable(response.data[8][0].PubliclyAvailable);
        if (response.data[9]) //set pictures;
        sessionStorage.setItem("DoctorAccountDetails", JSON.stringify(response.data));
      }
    } catch(error) {
      if (error.response.status === 401) invalidUserAction(error.response.data)
    }
  }
  
  if (user_type !== 'Doctor') return <NonDoctorAccess/>

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
      />
      <RenderDescriptionSection
        description = {description}
        setDescription = {setDescription}
        isDescriptionOverLimit = {isDescriptionOverLimit}
        setIsDescriptionOverLimit = {setIsDescriptionOverLimit}
      />
      <RenderPersonalInfoLinkSection/>
      {/* <RenderPicturesSection
        carouselIndex = {carouselIndex}
        setCarouselIndex = {setCarouselIndex}
      /> */}
      <RenderPetsSection
        listDetails = {listDetails}
        servicedPets = {servicedPets}
        setServicedPets = {setServicedPets}
        expandedPetTypes = {expandedPetTypes}
        setExpandedPetTypes = {setExpandedPetTypes}
      />
      <RenderSpecialtySection 
        listDetails = {listDetails}
        selectedOrganization = {selectedOrganization}
        setSelectedOrganization = {setSelectedOrganization}
        doctorSpecialties = {doctorSpecialties}
        setDoctorSpecialties = {setDoctorSpecialties}
      />
      <RenderLanguageSection
        listDetails = {listDetails}
        spokenLanguages = {spokenLanguages}
        setSpokenLanguages = {setSpokenLanguages}
      />
      <RenderServiceSection
        listDetails = {listDetails}
        selectedCategories = {selectedCategories}
        setSelectedCategories = {setSelectedCategories}
        providedServices = {providedServices}
        setProvidedServices = {setProvidedServices}
        expandedCategories = {expandedCategories}
        setExpandedCategories = {setExpandedCategories}
      />
      <RenderLocationSection
        addresses = {addresses}
        setAddresses = {setAddresses}
      />
      <RenderVerificationAndPublicStatusSection
        publiclyAvailable = {publiclyAvailable}
        setPubliclyAvailable = {setPubliclyAvailable}
        verified = {verified}
      />
  </div>
  );
};
