/* eslint-disable complexity */
import { useState, useEffect} from "react"
import {useParams} from "react-router-dom"
import PublicDoctorDataService from "../../services/public-doctor-data-service"
import "./card.css"
import BookingSection from "./public-doctor-booking"
import ReviewsSection from "./public-doctor-reviews"
import ServiceSection from "./public-doctor-services"
import LanguageSection from "./public-doctor-languages"
import LocationsSection from "./public-doctor-locations"
import EducationSection from "./public-doctor-education"
import SpecialtiesSection from "./public-doctor-specialties"
import PersonalInfoSection from "./public-doctor-personal-info"
import DescriptionSection from "./public-doctor-description"
import ServicedPetsSection from "./public-doctor-serviced-pets"

export default function Doctor () {
	const { id } = useParams()
	const [spokenLanguages, setSpokenLanguages] = useState([])
	const [providedServices, setProvidedServices] = useState([])
	const [doctorSpecialties, setDoctorSpecialties] = useState([])
	const [preVetEducation, setPreVetEducation] = useState([])
	const [vetEducation, setVetEducation] = useState([])
	const [addresses, setAddresses] = useState<PublicAddressData[]>(
		[{ addressPriority: 0, addressesId: -1, addressTitle: "", addressLine1  : "", addressLine2: "",
			city: "", state: "", zip: "", country: "", phone: "", instantBook: false, times:[]
		}])
	const [description, setDescription] = useState("")
	const [servicedPets, setServicedPets] = useState([])
	const [personalData, setPersonalData] = useState<DoctorPersonalData>({firstName: "", lastName: "", gender: "", nvi: 0})

	const idNumber = Number(id)

	async function FillDoctorData(doctorIDNumber: number) {
		try {
			const response = await PublicDoctorDataService.getSingleDoctor(doctorIDNumber)
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
			<PersonalInfoSection
				personalData = {personalData}
			/>
			<BookingSection
				providedServices = {providedServices}
				addresses = {addresses}
				personalData = {personalData}
			/>
			<DescriptionSection
				description = {description}
			/>
			<LocationsSection
				addresses = {addresses}
			/>
			<ServicedPetsSection
				servicedPets = {servicedPets}
			/>
			<LanguageSection
				spokenLanguages = {spokenLanguages}
			/>
			<ServiceSection
				providedServices = {providedServices}
			/>
			<EducationSection
				preVetEducation = {preVetEducation}
				vetEducation = {vetEducation}
				personalData = {personalData}
			/>
			<SpecialtiesSection
				doctorSpecialties = {doctorSpecialties}
			/>
			<ReviewsSection
			/>
		</>
	)
}
