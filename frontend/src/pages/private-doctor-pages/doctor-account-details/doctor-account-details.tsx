import { useState } from "react"
import UnauthorizedUser from "../../../components/unauthorized-user/unauthorized-user"
import Header from "../../../components/header/header"
import useSimpleUserVerification from "../../../custom-hooks/use-simple-user-verification"
import DoctorHeader from "../doctor-header"
import PetsSection from "./pets"
import ServiceSection from "./service"
import LanguageSection from "./language"
import LocationSection from "./location"
//import PicturesSection from "./pictures"
import SpecialtySection from "./specialty"
import VetEducationSection from "./vet-education"
import DescriptionSection from "./description"
import PublicStatusSection from "./public-status"
import VerificationSection from "./verification-status"
import PreVetEducationSection from "./pre-vet-education"
import PersonalInfoLinkSection from "./personalInfoLink"
import useSetDoctorAccountDetails from "src/custom-hooks/account-details/use-set-doctor-account-details"

// eslint-disable-next-line complexity
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

  const dispatchers: DoctorAccountDispatchers = {
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
  }

  useSetDoctorAccountDetails(
    setListDetails,
    setExpandedCategories,
    dispatchers
  )

  if (userType !== "Doctor") return <UnauthorizedUser vetOrpatient = {"vet"}/>

  return (
    <div>
      <Header dropdown = {true}/>
      <DoctorHeader/>
      <PreVetEducationSection
        listDetails = {listDetails}
        preVetEducation = {preVetEducation}
        setPreVetEducation = {setPreVetEducation}
      />
      <VetEducationSection
        listDetails = {listDetails}
        vetEducation = {vetEducation}
        setVetEducation = {setVetEducation}
      />
      <DescriptionSection
        description = {description}
        setDescription = {setDescription}
      />
      <PersonalInfoLinkSection/>
      {/* <PicturesSection
        carouselIndex = {carouselIndex}
        setCarouselIndex = {setCarouselIndex}
      /> */}
      <PetsSection
        listDetails = {listDetails}
        servicedPets = {servicedPets}
        setServicedPets = {setServicedPets}
        expandedPetTypes = {expandedPetTypes}
        setExpandedPetTypes = {setExpandedPetTypes}
      />
      <SpecialtySection
        listDetails = {listDetails}
        doctorSpecialties = {doctorSpecialties}
        setDoctorSpecialties = {setDoctorSpecialties}
      />
      <LanguageSection
        listDetails = {listDetails}
        spokenLanguages = {spokenLanguages}
        setSpokenLanguages = {setSpokenLanguages}
      />
      <ServiceSection
        listDetails = {listDetails}
        providedServices = {providedServices}
        setProvidedServices = {setProvidedServices}
        expandedCategories = {expandedCategories}
        setExpandedCategories = {setExpandedCategories}
      />
      <LocationSection
        addresses = {addresses}
        setAddresses = {setAddresses}
      />
      <PublicStatusSection
        publiclyAvailable = {publiclyAvailable}
        setPubliclyAvailable = {setPubliclyAvailable}
      />
      <VerificationSection
        verified = {verified}
      />
    </div>
  )
}
