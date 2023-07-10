import { useState, useEffect} from "react"
import {useParams} from "react-router-dom"
import PublicDoctorDataService from "../../services/public-doctor-data-service.js"
import Header from "../header.js"
import "./card.css"
import RenderBookingSection from "./public-doctor-booking.js"
import RenderReviewsSection from "./public-doctor-reviews.js"
import RenderServiceSection from "./public-doctor-services.js"
import RenderLanguageSection from "./public-doctor-languages.js"
import RenderLocationsSection from "./public-doctor-locations.js"
import RenderEducationSection from "./public-doctor-education.js"
import RenderSpecialtiesSection from "./public-doctor-specialties.js"
import RenderPersonalInfoSection from "./public-doctor-personal-info.js"
import RenderDescriptionSection from "./public-doctor-description.js"
import RenderServicedPetsSection from "./public-doctor-serviced-pets.js"

export default function Doctor () {
  let { id } = useParams() //the id of the current site (which doctorData) --> used to set User
  const [spokenLanguages, setSpokenLanguages] = useState([])
  const [providedServices, setProvidedServices] = useState([])
  const [doctorSpecialties, setDoctorSpecialties] = useState([])
  const [preVetEducation, setPreVetEducation] = useState([])
  const [vetEducation, setVetEducation] = useState([])
  const [addresses, setAddresses] = useState([{ address_priority: 0, addressesID: 0, address_title: "", address_line_1  : "", address_line_2: "", city: "", state: "", zip: "", country: "", phone_priority: 0, phone: "", address_public_status: 1, instant_book: 0, times:[]}])
  const [description, setDescription] = useState("")
  const [servicedPets, setServicedPets] = useState([])
  const [personalData, setPersonalData] = useState({FirstName: "", LastName: "", Gender: "", NVI: ""})

  if (Number(id)) id = Number(id)

  async function FillDoctorData(id) {
    try {
      const response = await PublicDoctorDataService.getSingleDoctor(id)
      if (response) {
        if (response.data.doctorLanguages) setSpokenLanguages(response.data.doctorLanguages)
        if (response.data.doctorServices) setProvidedServices(response.data.doctorServices)
        if (response.data.doctorSpecialties) setDoctorSpecialties(response.data.doctorSpecialties)
        if (response.data.doctorPreVetEducation) setPreVetEducation(response.data.doctorPreVetEducation)
        if (response.data.doctorVetEducation) setVetEducation(response.data.doctorVetEducation)
        if (response.data.doctorAddressData) setAddresses(response.data.doctorAddressData)
        if (response.data.description) setDescription(response.data.description)
        if (response.data.servicedPets) setServicedPets(response.data.servicedPets)
        if (response.data.doctorPictures) ;// Somehow set pictures.
        if (response.data.doctorPersonalInfo) setPersonalData(response.data.doctorPersonalInfo)
      }
    } catch (error) {
    }
  }

  useEffect(() => {
    FillDoctorData(id)
  }, [])

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
      <RenderServicedPetsSection
        servicedPets = {servicedPets}
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
        personalData = {personalData}
      />
      <RenderSpecialtiesSection
        doctorSpecialties = {doctorSpecialties}
      />
      <RenderReviewsSection
      />
    </>
  )
}
