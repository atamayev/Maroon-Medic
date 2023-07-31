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

async function FillLists(setListDetails: React.Dispatch<React.SetStateAction<ListDetailsType>>) {
  try {
    const response = await ListsDataService.fillDoctorLists()
    if (response) {
      setListDetails(response.data)
      sessionStorage.setItem("ListDetails", JSON.stringify(response.data))
    }
  } catch (error: unknown) {
    handle401AxiosError(error)
  }
}

async function FillDoctorAccountDetails(
  setSpokenLanguages: React.Dispatch<React.SetStateAction<LanguageItemType[]>>,
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
    const response = await PrivateDoctorDataService.fillAccountDetails()
    if (response) {
      if (response.data.languages) setSpokenLanguages(response.data.languages)
      if (response.data.services) {
        setProvidedServices(response.data.services)
        setExpandedCategories(response.data.services.map(service => service.Category_name))
      }
      if (response.data.specialties) setDoctorSpecialties(response.data.specialties)
      if (response.data.preVetEducation) setPreVetEducation(response.data.preVetEducation)
      if (response.data.vetEducation) setVetEducation(response.data.vetEducation)
      if (response.data.addressData) setAddresses(response.data.addressData)
      if (response.data.description) setDescription(response.data.description)
      if (response.data.servicedPets) {
        setServicedPets(response.data.servicedPets)
        setExpandedPetTypes(response.data.servicedPets.map(pet =>pet.pet_type))
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
  setListDetails: React.Dispatch<React.SetStateAction<ListDetailsType>>,
  setSpokenLanguages: React.Dispatch<React.SetStateAction<LanguageItemType[]>>,
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
    try {
      const storedAccountDetails = sessionStorage.getItem("DoctorAccountDetails")
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
          setPubliclyAvailable)
      } else setExpandedCategories(JSON.parse(storedAccountDetails).services?.map(service => service.Category_name))

      const storedListDetails = sessionStorage.getItem("ListDetails")
      if (storedListDetails) setListDetails(JSON.parse(storedListDetails))
      else FillLists(setListDetails)
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
  if (userType !== "Doctor") return <UnauthorizedUser patientOrDoctor = {"vet"}/>
  const [listDetails, setListDetails] = useState<ListDetailsType>({} as ListDetailsType)
  //const [carouselIndex, setCarouselIndex] = useState(0)

  const DoctorAccountDetails = JSON.parse(sessionStorage.getItem("DoctorAccountDetails") ?? "{}")

  const [spokenLanguages, setSpokenLanguages] = useState<LanguageItemType[]>(DoctorAccountDetails?.languages || [])

  const [providedServices, setProvidedServices] = useState(DoctorAccountDetails?.services || [])
  const [expandedCategories, setExpandedCategories] = useState([])

  const [doctorSpecialties, setDoctorSpecialties] = useState(DoctorAccountDetails?.specialties || [])

  const [preVetEducation, setPreVetEducation] = useState(DoctorAccountDetails?.preVetEducation || [])

  const [vetEducation, setVetEducation] = useState(DoctorAccountDetails?.vetEducation || [])

  const [addresses, setAddresses] = useState(
    DoctorAccountDetails?.addressData ||
    [{ address_priority: 0, addressesID: 0, address_title: "", address_line_1  : "", address_line_2: "", city: "",
      state: "", zip: "", country: "", phone: "", address_public_status: 1, instant_book: 0, times:[]}])

  const [description, setDescription] = useState(DoctorAccountDetails?.description || "")

  const [servicedPets, setServicedPets] = useState(DoctorAccountDetails?.servicedPets || [])
  const [expandedPetTypes, setExpandedPetTypes] = useState([])

  const [publiclyAvailable, setPubliclyAvailable] = useState(DoctorAccountDetails?.publiclyAvailable || 0)
  const verified  = DoctorAccountDetails?.verified || 0

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
