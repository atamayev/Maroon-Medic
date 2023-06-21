import _ from "lodash"
import React, {useEffect, useContext, useState} from 'react'
import { VerifyContext } from '../../../contexts/verify-context.js';
import { NonDoctorAccess } from '../../../components/user-type-unauth.js';
import PrivateDoctorDataService from '../../../services/private-doctor-data-service.js';
import { invalidUserAction } from '../../../custom-hooks/user-verification-snippets.js';
import Header from '../../header.js';
import DoctorHeader from '../doctor-header.js';
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

  const [spokenLanguages, setSpokenLanguages] = useState(DoctorAccountDetails?.languages || []);

  const [providedServices, setProvidedServices] = useState(DoctorAccountDetails?.services || []);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState([]);

  const [selectedOrganization, setSelectedOrganization] = useState('');
  const [doctorSpecialties, setDoctorSpecialties] = useState(DoctorAccountDetails?.specialties || []);

  const [selectedPreVetSchool, setSelectedPreVetSchool] = useState('');
  const [selectedMajor, setSelectedMajor] = useState('');
  const [selectedPreVetEducationType, setSelectedPreVetEducationType] = useState('');
  const [preVetEducation, setPreVetEducation] = useState(DoctorAccountDetails?.preVetEducation || []);

  const [selectedVetSchool, setSelectedVetSchool] = useState('');
  const [selectedVetEducationType, setSelectedVetEducationType] = useState('');
  const [vetEducation, setVetEducation] = useState(DoctorAccountDetails?.vetEducation || []);

  const [addresses, setAddresses] = useState(DoctorAccountDetails?.addressData ||[{ address_priority: 0, addressesID: 0, address_title: '', address_line_1  : '', address_line_2: '', city: '', state: '', zip: '', country: '', phone_priority: 0, phone: '', address_public_status: 1, instant_book: 0, times:[]}]);

  const [isDescriptionOverLimit, setIsDescriptionOverLimit] = useState(false);
  const [description, setDescription] = useState(DoctorAccountDetails?.descriptionData || {});

  const [servicedPets, setServicedPets] = useState(DoctorAccountDetails?.servicedPets || []);
  const [expandedPetTypes, setExpandedPetTypes] = useState([]);

  const [publiclyAvailable, setPubliclyAvailable] = useState(DoctorAccountDetails?.publiclyAvailable[0]?.PubliclyAvailable || 0);
  const verified = DoctorAccountDetails?.publiclyAvailable[0].Verified || [];

  const currentYear = new Date().getFullYear();

  const [timeState, setTimeState] = useState({
    startMonth: 'January', 
    endMonth: 'January', 
    startYear: currentYear, 
    endYear: currentYear,
  });

  const verifyDoctorAndSetAccountDetails = async () => {
    const result = await user_verification();
    if (result.verified === true) {
      setUser_type(result.user_type)
      if (result.user_type === 'Doctor') {
        try {
          const storedAccountDetails = sessionStorage.getItem("DoctorAccountDetails")
          if (!storedAccountDetails) FillDoctorAccountDetails();
          else setExpandedCategories(JSON.parse(storedAccountDetails).services?.map(service => service.Category_name))

          const storedListDetails = sessionStorage.getItem("ListDetails")
          if (storedListDetails) setListDetails(JSON.parse(storedListDetails));
          else FillLists(setListDetails);
        } catch(error) {
        }
      }
    }
  }

  useEffect(() => {
    verifyDoctorAndSetAccountDetails()
  }, []);

  async function FillDoctorAccountDetails() {
    try {
      const response = await PrivateDoctorDataService.fillAccountDetails();
      if (response) {
        if (response.data.languages) setSpokenLanguages(response.data.languages);
        if (response.data.services) {
          setProvidedServices(response.data.services)
          setExpandedCategories(response.data.services.map(service => service.Category_name));
        }
        if (response.data.specialties) setDoctorSpecialties(response.data.specialties);
        if (response.data.preVetEducation) setPreVetEducation(response.data.preVetEducation);
        if (response.data.vetEducation) setVetEducation(response.data.vetEducation);
        if (response.data.addressData) setAddresses(response.data.addressData);
        if (response.data.descriptionData && !_.isEmpty(Object.keys(response.data.descriptionData))) {
          setDescription(response.data.descriptionData);
          if (response.data.descriptionData.Description.length === 1000) setIsDescriptionOverLimit(true);
        }
        if (response.data.servicedPets) {
          setServicedPets(response.data.servicedPets)
          setExpandedPetTypes(response.data.servicedPets.map(pet =>pet.pet_type));
          //Somehow set pictures.
        }
        if (response.data.publiclyAvailable[0].PubliclyAvailable) setPubliclyAvailable(response.data.publiclyAvailable[0].PubliclyAvailable);
        if (response.data.pictures) //set pictures;
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
