import { observer } from "mobx-react"
import { useContext, useState } from "react"
import UnauthorizedUser from "../../../components/unauthorized-user/unauthorized-user"
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
import { AppContext } from "src/contexts/maroon-context"

// eslint-disable-next-line complexity, max-lines-per-function
function DoctorAccountDetails() {
	const appContext = useContext(AppContext)
	//const [carouselIndex, setCarouselIndex] = useState(0)

	const [spokenLanguages, setSpokenLanguages] = useState<LanguageItem[]>(appContext.doctorAccountDetails?.languages || [])

	const [providedServices, setProvidedServices] = useState<ServiceItemNotNullablePrice[]>(appContext.doctorAccountDetails?.services || [])
	const [expandedCategories, setExpandedCategories] = useState<string[]>([])

	const [doctorSpecialties, setDoctorSpecialties] = useState<SpecialtyItem[]>(appContext.doctorAccountDetails?.specialties || [])

	const [preVetEducation, setPreVetEducation] = useState<PreVetEducationItem[]>(appContext.doctorAccountDetails?.preVetEducation || [])

	const [vetEducation, setVetEducation] = useState<VetEducationItem[]>(appContext.doctorAccountDetails?.vetEducation || [])

	const [addresses, setAddresses] = useState<DoctorAddressData[]>(
		appContext.doctorAccountDetails?.addressData ||
	[{ addressPriority: 0, addressesId: -1, addressTitle: "", addressLine1: "", addressLine2: "", city: "",
		state: "", zip: "", country: "", phone: "", addressPublicStatus: true, instantBook: false, times:[]}])

	const [description, setDescription] = useState<string>(appContext.doctorAccountDetails?.description || "")

	const [servicedPets, setServicedPets] = useState<ServicedPetItem[]>(appContext.doctorAccountDetails?.servicedPets || [])
	const [expandedPetTypes, setExpandedPetTypes] = useState<string[]>([])

	const [publiclyAvailable, setPubliclyAvailable] = useState<boolean>(appContext.doctorAccountDetails?.publiclyAvailable || false)
	const verified: boolean = appContext.doctorAccountDetails?.verified || false

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

	useSetDoctorAccountDetails(setExpandedCategories, dispatchers)

	if (appContext.userType !== "Doctor") return <UnauthorizedUser vetOrpatient = {"vet"}/>

	return (
		<div>
			<DoctorHeader/>
			<PreVetEducationSection
				preVetEducation = {preVetEducation}
				setPreVetEducation = {setPreVetEducation}
			/>
			<VetEducationSection
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
				servicedPets = {servicedPets}
				setServicedPets = {setServicedPets}
				expandedPetTypes = {expandedPetTypes}
				setExpandedPetTypes = {setExpandedPetTypes}
			/>
			<SpecialtySection
				doctorSpecialties = {doctorSpecialties}
				setDoctorSpecialties = {setDoctorSpecialties}
			/>
			<LanguageSection
				spokenLanguages = {spokenLanguages}
				setSpokenLanguages = {setSpokenLanguages}
			/>
			<ServiceSection
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

export default observer(DoctorAccountDetails)
