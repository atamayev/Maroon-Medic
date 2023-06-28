import _ from 'lodash';
import { useEffect, useState } from 'react'
import { NonDoctorAccess } from '../../../components/user-type-unauth.js';
import PrivateDoctorDataService from '../../../services/private-doctor-data-service.js';
import { invalidUserAction } from '../../../custom-hooks/user-verification-snippets.js';
import Header from '../../header.js';
import useSimpleUserVerification from "../../../custom-hooks/use-simple-user-verification.js";
import DoctorHeader from '../doctor-header.js';
import RenderPetsSection from './pets.js';
import RenderServiceSection from './service.js';
import RenderLanguageSection from './language.js';
import RenderLocationSection from './location.js';
//import RenderPicturesSection from './pictures.js';
import RenderSpecialtySection from './specialty.js';
import RenderVetEducationSection from './vet-education.js';
import RenderDescriptionSection from './description.js';
import RenderPublicStatusSection from './public-status.js';
import RenderVerificationSection from './verification-status.js';
import RenderPreVetEducationSection from './pre-vet-education.js';
import RenderPersonalInfoLinkSection from './personalInfoLink.js';

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

async function FillDoctorAccountDetails(
  setSpokenLanguages,
  setProvidedServices,
  setExpandedCategories,
  setDoctorSpecialties,
  setPreVetEducation,
  setVetEducation,
  setAddresses,
  setDescription,
  setServicedPets,
  setExpandedPetTypes,
  setPubliclyAvailable
  ) {
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
      if (response.data.description) setDescription(response.data.description);
      if (response.data.servicedPets) {
        setServicedPets(response.data.servicedPets)
        setExpandedPetTypes(response.data.servicedPets.map(pet =>pet.pet_type));
      }
      if (_.has(response.data, 'publiclyAvailable')) setPubliclyAvailable(response.data.publiclyAvailable);
      if (response.data.pictures) ; //set pictures;
      sessionStorage.setItem("DoctorAccountDetails", JSON.stringify(response.data));
    }
  } catch(error) {
    if (error.response.status === 401) invalidUserAction(error.response.data)
  }
}

function useDoctorAccountDetails(
  userType,
  setListDetails,
  setSpokenLanguages,
  setProvidedServices,
  setExpandedCategories,
  setDoctorSpecialties,
  setPreVetEducation,
  setVetEducation,
  setAddresses,
  setDescription,
  setServicedPets,
  setExpandedPetTypes,
  setPubliclyAvailable
  ) {

  const getDoctorAccountDetails = async () => {
    if (userType === 'Doctor') {
      try {
        const storedAccountDetails = sessionStorage.getItem("DoctorAccountDetails");
        if (!storedAccountDetails) {
          FillDoctorAccountDetails(  
            setSpokenLanguages,
            setProvidedServices,
            setExpandedCategories,
            setDoctorSpecialties,
            setPreVetEducation,
            setVetEducation,
            setAddresses,
            setDescription,
            setServicedPets,
            setExpandedPetTypes,
            setPubliclyAvailable);
        } else setExpandedCategories(JSON.parse(storedAccountDetails).services?.map(service => service.Category_name));  

        const storedListDetails = sessionStorage.getItem("ListDetails");
        if (storedListDetails) setListDetails(JSON.parse(storedListDetails));
        else FillLists(setListDetails);
      } catch (error) {
      }
    }
  };

  useEffect(() => {
    getDoctorAccountDetails();
  }, [userType]);
}

export default function DoctorAccountDetails() {
  const { userType } = useSimpleUserVerification();
  const [listDetails, setListDetails] = useState({});
  //const [carouselIndex, setCarouselIndex] = useState(0);
  const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails"));
  
  const [spokenLanguages, setSpokenLanguages] = useState(DoctorAccountDetails?.languages || []);
  
  const [providedServices, setProvidedServices] = useState(DoctorAccountDetails?.services || []);
  const [expandedCategories, setExpandedCategories] = useState([]);
  
  const [doctorSpecialties, setDoctorSpecialties] = useState(DoctorAccountDetails?.specialties || []);
  
  const [preVetEducation, setPreVetEducation] = useState(DoctorAccountDetails?.preVetEducation || []);
  
  const [vetEducation, setVetEducation] = useState(DoctorAccountDetails?.vetEducation || []);
  
  const [addresses, setAddresses] = useState(DoctorAccountDetails?.addressData ||[{ address_priority: 0, addressesID: 0, address_title: '', address_line_1  : '', address_line_2: '', city: '', state: '', zip: '', country: '', phone_priority: 0, phone: '', address_public_status: 1, instant_book: 0, times:[]}]);
  
  const [description, setDescription] = useState(DoctorAccountDetails?.description || '');
  
  const [servicedPets, setServicedPets] = useState(DoctorAccountDetails?.servicedPets || []);
  const [expandedPetTypes, setExpandedPetTypes] = useState([]);
  
  const [publiclyAvailable, setPubliclyAvailable] = useState(DoctorAccountDetails?.publiclyAvailable || 0);
  const verified  = DoctorAccountDetails?.verified || 0;
 
  const [timeState, setTimeState] = useState({
    startMonth: '', 
    endMonth: '', 
    startYear: '', 
    endYear: '',
  });
  
  useDoctorAccountDetails(userType, setListDetails, setSpokenLanguages, setProvidedServices, setExpandedCategories, setDoctorSpecialties, setPreVetEducation, setVetEducation, setAddresses, setDescription, setServicedPets, setExpandedPetTypes, setPubliclyAvailable);
  
  if (userType !== 'Doctor') return <NonDoctorAccess/>

  return (
    <div>
      <Header dropdown = {true}/>
      <DoctorHeader/>
      <RenderPreVetEducationSection
        listDetails = {listDetails}
        timeState = {timeState}
        setTimeState = {setTimeState}
        preVetEducation = {preVetEducation}
        setPreVetEducation = {setPreVetEducation}
      />
      <RenderVetEducationSection
        listDetails = {listDetails}
        timeState = {timeState}
        setTimeState = {setTimeState}
        vetEducation = {vetEducation}
        setVetEducation = {setVetEducation}
      />
      <RenderDescriptionSection
        description = {description}
        setDescription = {setDescription}
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
        providedServices = {providedServices}
        setProvidedServices = {setProvidedServices}
        expandedCategories = {expandedCategories}
        setExpandedCategories = {setExpandedCategories}
      />
      <RenderLocationSection
        addresses = {addresses}
        setAddresses = {setAddresses}
      />
      <RenderPublicStatusSection
        publiclyAvailable = {publiclyAvailable}
        setPubliclyAvailable = {setPubliclyAvailable}
      />
      <RenderVerificationSection
        verified = {verified}
      />
  </div>
  );
};