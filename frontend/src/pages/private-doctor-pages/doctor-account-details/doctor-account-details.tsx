import { useState } from "react"
import { UnauthorizedUser } from "../../../components/user-type-unauth"
import Header from "../../../components/header/header"
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
import { useDoctorAccountDetails } from "src/custom-hooks/account-details-hooks/fetch-doctor-data"

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

  useDoctorAccountDetails(
    setListDetails,
    setExpandedCategories,
    dispatchers
  )

  if (userType !== "Doctor") return <UnauthorizedUser vetOrpatient = {"vet"}/>

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
