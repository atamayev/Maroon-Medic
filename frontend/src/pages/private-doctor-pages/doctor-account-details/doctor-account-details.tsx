import _ from "lodash"
import { useEffect, useState } from "react"
import { UnauthorizedUser } from "../../../components/user-type-unauth"
import PrivateDoctorDataService from "../../../services/private-doctor-data-service"
import Header from "../../header"
import useSimpleUserVerification from "../../../custom-hooks/use-simple-user-verification"
import DoctorHeader from "../doctor-header"
import RenderPetsSection from "./pets"
import RenderServiceSection from "./service"
import RenderLanguageSection from "./language"
import RenderLocationSection from "./location"
//import RenderPicturesSection from "./pictures"
import RenderSpecialtySection from "./specialty"
import RenderVetEducationSection from "./vet-education"
import RenderDescriptionSection from "./description"
import RenderPublicStatusSection from "./public-status"
import RenderVerificationSection from "./verification-status"
import RenderPreVetEducationSection from "./pre-vet-education"
import RenderPersonalInfoLinkSection from "./personalInfoLink"
import ListsDataService from "../../../services/lists-data-service"
import { handle401AxiosError } from "src/utils/handle-errors"

async function FillLists(setListDetails: React.Dispatch<React.SetStateAction<DoctorListDetails>>) {
  try {
    const response = await ListsDataService.fillDoctorLists()
    setListDetails(response.data)
    sessionStorage.setItem("ListDetails", JSON.stringify(response.data))
  } catch (error: unknown) {
    handle401AxiosError(error)
  }
}

async function FillDoctorAccountDetails(
  setSpokenLanguages: React.Dispatch<React.SetStateAction<LanguageItem[]>>,
  setProvidedServices: React.Dispatch<React.SetStateAction<ServiceItem[]>>,
  setExpandedCategories: React.Dispatch<React.SetStateAction<string[]>>,
  setDoctorSpecialties: React.Dispatch<React.SetStateAction<SpecialtyItem[]>>,
  setPreVetEducation: React.Dispatch<React.SetStateAction<PreVetEducationItem[]>>,
  setVetEducation: React.Dispatch<React.SetStateAction<VetEducationItem[]>>,
  setAddresses: React.Dispatch<React.SetStateAction<DoctorAddressData[]>>,
  setDescription: React.Dispatch<React.SetStateAction<string>>,
  setServicedPets: React.Dispatch<React.SetStateAction<ServicedPetItem[]>>,
  setExpandedPetTypes: React.Dispatch<React.SetStateAction<string[]>>,
  setPubliclyAvailable: React.Dispatch<React.SetStateAction<boolean>>
) {
  try {
    const response = await PrivateDoctorDataService.fillAccountDetails()
    if (response.data) {
      if (response.data.languages) setSpokenLanguages(response.data.languages)
      if (response.data.services) {
        setProvidedServices(response.data.services)
        setExpandedCategories(response.data.services.map((service: ServiceItem) => service.Category_name))
      }
      if (response.data.specialties) setDoctorSpecialties(response.data.specialties)
      if (response.data.preVetEducation) setPreVetEducation(response.data.preVetEducation)
      if (response.data.vetEducation) setVetEducation(response.data.vetEducation)
      if (response.data.addressData) setAddresses(response.data.addressData)
      if (response.data.description) setDescription(response.data.description)
      if (response.data.servicedPets) {
        setServicedPets(response.data.servicedPets)
        setExpandedPetTypes(response.data.servicedPets.map((pet: ServicedPetItem) => pet.Pet_type))
      }
      if (_.has(response.data, "publiclyAvailable")) setPubliclyAvailable(response.data.publiclyAvailable)
      // if (response.data.pictures) ; //set pictures
      sessionStorage.setItem("DoctorAccountDetails", JSON.stringify(response.data))
    }
  } catch (error: unknown) {
    handle401AxiosError(error)
  }
}

function useDoctorAccountDetails(
  setListDetails: React.Dispatch<React.SetStateAction<DoctorListDetails>>,
  setSpokenLanguages: React.Dispatch<React.SetStateAction<LanguageItem[]>>,
  setProvidedServices: React.Dispatch<React.SetStateAction<ServiceItem[]>>,
  setExpandedCategories: React.Dispatch<React.SetStateAction<string[]>>,
  setDoctorSpecialties: React.Dispatch<React.SetStateAction<SpecialtyItem[]>>,
  setPreVetEducation: React.Dispatch<React.SetStateAction<PreVetEducationItem[]>>,
  setVetEducation: React.Dispatch<React.SetStateAction<VetEducationItem[]>>,
  setAddresses: React.Dispatch<React.SetStateAction<DoctorAddressData[]>>,
  setDescription: React.Dispatch<React.SetStateAction<string>>,
  setServicedPets: React.Dispatch<React.SetStateAction<ServicedPetItem[]>>,
  setExpandedPetTypes: React.Dispatch<React.SetStateAction<string[]>>,
  setPubliclyAvailable: React.Dispatch<React.SetStateAction<boolean>>
) {
  const getDoctorAccountDetails = async () => {
    try {
      const storedAccountDetails = sessionStorage.getItem("DoctorAccountDetails")
      if (!storedAccountDetails) {
        await FillDoctorAccountDetails(
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
        )
      } else setExpandedCategories(JSON.parse(storedAccountDetails).services?.map((service: ServiceItem) => service.Category_name))

      const storedListDetails = sessionStorage.getItem("ListDetails")
      if (storedListDetails) setListDetails(JSON.parse(storedListDetails))
      else await FillLists(setListDetails)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getDoctorAccountDetails()
  }, [])
}

export default function DoctorAccountDetails() {
  const { userType } = useSimpleUserVerification()
  const [listDetails, setListDetails] = useState<DoctorListDetails>({
    languages: [],
    servicesAndCategories: [],
    specialties: [],
    preVetSchools: [],
    preVetEducationTypes: [],
    majors: [],
    vetSchools: [],
    vetEducationTypes: [],
    pets: []
  })
  //const [carouselIndex, setCarouselIndex] = useState(0)

  const doctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails") ?? "{}")

  const [spokenLanguages, setSpokenLanguages] = useState<LanguageItem[]>(doctorAccountDetails?.languages || [])

  const [providedServices, setProvidedServices] = useState<ServiceItem[]>(doctorAccountDetails?.services || [])
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])

  const [doctorSpecialties, setDoctorSpecialties] = useState<SpecialtyItem[]>(doctorAccountDetails?.specialties || [])

  const [preVetEducation, setPreVetEducation] = useState<PreVetEducationItem[]>(doctorAccountDetails?.preVetEducation || [])

  const [vetEducation, setVetEducation] = useState<VetEducationItem[]>(doctorAccountDetails?.vetEducation || [])

  const [addresses, setAddresses] = useState<DoctorAddressData[]>(
    doctorAccountDetails?.addressData ||
    [{ address_priority: 0, addressesID: -1, address_title: "", address_line_1: "", address_line_2: "", city: "",
      state: "", zip: "", country: "", Phone: [], address_public_status: true, instant_book: false, times:[]}])

  const [description, setDescription] = useState<string>(doctorAccountDetails?.description || "")

  const [servicedPets, setServicedPets] = useState<ServicedPetItem[]>(doctorAccountDetails?.servicedPets || [])
  const [expandedPetTypes, setExpandedPetTypes] = useState<string[]>([])

  const [publiclyAvailable, setPubliclyAvailable] = useState<boolean>(doctorAccountDetails?.publiclyAvailable || false)
  const verified: boolean = doctorAccountDetails?.verified || false

  useDoctorAccountDetails(
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
  )

  if (userType !== "Doctor") return <UnauthorizedUser patientOrDoctor = {"vet"}/>

  return (
    <div>
      <Header dropdown = {true}/>
      <DoctorHeader/>
      <RenderPreVetEducationSection
        listDetails = {listDetails}
        preVetEducation = {preVetEducation}
        setPreVetEducation = {setPreVetEducation}
      />
      <RenderVetEducationSection
        listDetails = {listDetails}
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
  )
}
