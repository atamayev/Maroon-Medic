import _ from "lodash"
import { AxiosError } from "axios"
import { observer } from "mobx-react"
import { useEffect, useContext, useState } from "react"
import AppContext from "src/contexts/maroon-context"
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
	const [doctorExists, setDoctorExists] = useState<boolean | null>(null)

	async function fillDoctorData(doctorIDNumber: number): Promise<void> {
		const doesDoctorExistInMemory = appContext.publicDoctorData.doesDoctorExist(doctorIDNumber)
		if (doesDoctorExistInMemory) return
		try {
			const response = await PublicDoctorDataService.getSingleDoctor(doctorIDNumber)
			if (response.status === 200) {
				appContext.publicDoctorData.initializeSinglePublicDoctorData(doctorIDNumber, response.data as PublicDoctorAccountDetails)
			}
		} catch (error: unknown) {
			if (error instanceof AxiosError) {
				if (error.response && error.response.status === 400) {
					setDoctorExists(false)
				}
			}
		}
	}

	useEffect(() => {
		if (_.isNull(doctorID)) return
		fillDoctorData(doctorID)
	}, [doctorID])

	if (doctorExists === false) return <p>This doctor does not exist.</p>

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
