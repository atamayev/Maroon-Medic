import _ from "lodash"
import { observer } from "mobx-react"
import { useEffect, useContext } from "react"
import { AppContext } from "src/contexts/maroon-context"
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
import useRetrieveDoctorIDFromParams from "src/custom-hooks/public-doctor/use-retrieve-doctor-id-from-params"

function Doctor () {
	const doctorID = useRetrieveDoctorIDFromParams()
	const appContext = useContext(AppContext)

	async function FillDoctorData(doctorIDNumber: number) {
		const doesDoctorExistInMemory = appContext.doesDoctorExist(doctorIDNumber)
		if (doesDoctorExistInMemory) return
		try {
			const response = await PublicDoctorDataService.getSingleDoctor(doctorIDNumber)
			appContext.initializeSinglePublicDoctorData(doctorIDNumber, response.data)
		} catch (error) {
		}
	}

	useEffect(() => {
		if (_.isNull(doctorID)) return
		FillDoctorData(doctorID)
	}, [])

	return (
		<>
			<PersonalInfoSection />
			<BookingSection	/>
			<DescriptionSection />
			<LocationsSection />
			<ServicedPetsSection />
			<LanguageSection />
			<ServiceSection	/>
			<EducationSection />
			<SpecialtiesSection	/>
			<ReviewsSection />
		</>
	)
}

export default observer(Doctor)
