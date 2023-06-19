import _ from "lodash"
import React, { useState, useEffect} from 'react';
import {useParams} from "react-router-dom";
import PublicDoctorDataService from '../../services/public-doctor-data-service.js';
import RenderBookingSection from './public-doctor-booking.js'
import RenderReviewsSection from "./public-doctor-reviews.js"
import RenderServiceSection from "./public-doctor-services.js"
import RenderLanguageSection from "./public-doctor-languages.js"
import RenderLocationsSection from "./public-doctor-locations.js"
import RenderEducationSection from "./public-doctor-education.js"
import RenderInsuranceSection from "./public-doctor-insurances.js"
import RenderSpecialtiesSection from "./public-doctor-specialties.js"
import RenderPersonalInfoSection from "./public-doctor-personal-info.js"
import RenderDescriptionSection from './public-doctor-description.js';
import Header from '../header.js';
import "./card.css"

export default function Doctor () {
  let { id } = useParams(); //the id of the current site (which doctorData) --> used to set User
  const [acceptedInsurances, setAcceptedInsurances] = useState([]);
  const [spokenLanguages, setSpokenLanguages] = useState([]);
  const [providedServices, setProvidedServices] = useState([]);
  const [doctorSpecialties, setDoctorSpecialties] = useState([]);
  const [preVetEducation, setPreVetEducation] = useState([]);
  const [vetEducation, setVetEducation] = useState([]);
  const [addresses, setAddresses] = useState([{ address_priority: 0, addressesID: 0, address_title: '', address_line_1  : '', address_line_2: '', city: '', state: '', zip: '', country: '', phone_priority: 0, phone: '', address_public_status: 1, instant_book: 0, times:[]}]);
  const [description, setDescription] = useState({});
  const [personalData, setPersonalData] = useState({});
  
  if (Number(id)) id = Number(id)
  
  async function FillDoctorData(id) {
    try {
      const response = await PublicDoctorDataService.getSingleDoctor(id)
      if (response) {
        if (response.data[0]) setAcceptedInsurances(response.data[0]);
        if (response.data[1]) setSpokenLanguages(response.data[1]);
        if (response.data[2]) setProvidedServices(response.data[2]);
        if (response.data[3]) setDoctorSpecialties(response.data[3]);
        if (response.data[4]) setPreVetEducation(response.data[4]);
        if (response.data[5]) setVetEducation(response.data[5]);
        if (response.data[6]) setAddresses(response.data[6]);
        if (response.data[7] && !_.isEmpty(Object.keys(response.data[7]))) setDescription(response.data[7]);
        if (response.data[8]) // Somehow set pictures.
        if (response.data[9]) setPersonalData(response.data[9]);
      }
    } catch(error) {
    }
  }

  useEffect(() => {
    FillDoctorData(id);
  }, []);

  return (
    <>
      <Header dropdown = {true} search = {true}/>
      <RenderPersonalInfoSection
        personalData = {personalData}
      />
      <RenderBookingSection
        providedServices = {providedServices}
        addresses = {addresses}
        personalData = {personalData}
      />
      <RenderDescriptionSection
        description = {description}
      />
      <RenderLocationsSection
        addresses = {addresses}
      />
      <RenderInsuranceSection
        acceptedInsurances = {acceptedInsurances}
      />
      <RenderLanguageSection
        spokenLanguages = {spokenLanguages}
      />
      <RenderServiceSection
        providedServices = {providedServices}
      />
      <RenderEducationSection
        preVetEducation = {preVetEducation}
        vetEducation = {vetEducation}
      />
      <RenderSpecialtiesSection
        doctorSpecialties = {doctorSpecialties}
      />
      <RenderReviewsSection
      />
    </>
  );
};
