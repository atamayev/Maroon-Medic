/* eslint-disable complexity */
import { useState, useEffect} from "react"
import {useParams} from "react-router-dom"
import PublicDoctorDataService from "../../services/public-doctor-data-service"
import Header from "../../components/header/header"
import "./card.css"
import BookingSection from "./public-doctor-booking"
import RenderReviewsSection from "./public-doctor-reviews"
import RenderServiceSection from "./public-doctor-services"
import RenderLanguageSection from "./public-doctor-languages"
import RenderLocationsSection from "./public-doctor-locations"
import RenderEducationSection from "./public-doctor-education"
import RenderSpecialtiesSection from "./public-doctor-specialties"
import RenderPersonalInfoSection from "./public-doctor-personal-info"
import RenderDescriptionSection from "./public-doctor-description"
import RenderServicedPetsSection from "./public-doctor-serviced-pets"

export default function Doctor () {
  const { id } = useParams()
  const [spokenLanguages, setSpokenLanguages] = useState([])
  const [providedServices, setProvidedServices] = useState([])
  const [doctorSpecialties, setDoctorSpecialties] = useState([])
  const [preVetEducation, setPreVetEducation] = useState([])
  const [vetEducation, setVetEducation] = useState([])
  const [addresses, setAddresses] = useState<PublicAddressData[]>(
    [{ address_priority: 0, addressesID: -1, address_title: "", address_line_1  : "", address_line_2: "",
      city: "", state: "", zip: "", country: "", Phone: "", instant_book: false, times:[]
    }])
  const [description, setDescription] = useState("")
  const [servicedPets, setServicedPets] = useState([])
  const [personalData, setPersonalData] = useState<DoctorPersonalData>({FirstName: "", LastName: "", Gender: "", NVI: 0})

  const idNumber = Number(id)

  async function FillDoctorData(IDNumber: number) {
    try {
      const response = await PublicDoctorDataService.getSingleDoctor(IDNumber)
      if (response.data.doctorLanguages) setSpokenLanguages(response.data.doctorLanguages)
      if (response.data.doctorServices) setProvidedServices(response.data.doctorServices)
      if (response.data.doctorSpecialties) setDoctorSpecialties(response.data.doctorSpecialties)
      if (response.data.doctorPreVetEducation) setPreVetEducation(response.data.doctorPreVetEducation)
      if (response.data.doctorVetEducation) setVetEducation(response.data.doctorVetEducation)
      if (response.data.doctorAddressData) setAddresses(response.data.doctorAddressData)
      if (response.data.description) setDescription(response.data.description)
      if (response.data.servicedPets) setServicedPets(response.data.servicedPets)
      // if (response.data.doctorPictures) ;// Somehow set pictures.
      if (response.data.doctorPersonalInfo) setPersonalData(response.data.doctorPersonalInfo)
    } catch (error) {
    }
  }

  useEffect(() => {
    FillDoctorData(idNumber)
  }, [])

  return (
    <>
      <Header dropdown = {true} search = {true}/>
      <RenderPersonalInfoSection
        personalData = {personalData}
      />
      <BookingSection
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
