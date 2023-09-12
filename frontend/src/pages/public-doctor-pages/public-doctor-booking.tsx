import _ from "lodash"
import moment from "moment"
import { observer } from "mobx-react"
import { useState, useEffect, useContext } from "react"
import useFetchAndSetPetData from "src/custom-hooks/public-doctor/use-fetch-and-set-pet-data"
import generateTimeSlots from "src/helper-functions/public-doctor/booking-page/generate-time-slots"
import NoAvailableTimes from "src/components/booking/no-available-times"
import PatientNotLoggedIn from "src/components/booking/patient-not-logged-in"
import SelectLocation from "src/components/booking/select-location"
import ChoosePet from "src/components/booking/choose-pet"
import SelectService from "src/components/booking/select-service"
import SelectDay from "src/components/booking/select-day"
import SelectTime from "src/components/booking/select-time"
import FinalizeBookingButton from "src/components/booking/finalize-booking-button"
import DoctorDoesNotHaveLocations from "src/components/booking/doctor-does-not-have-locations"
import DoctorDoesNotOfferServices from "src/components/booking/doctor-does-not-offer-services"
import { getDayIndex } from "src/utils/time"
import NoLocationHasTimes from "src/components/booking/no-location-has-times"
import { AppContext } from "src/contexts/maroon-context"

interface Props {
	providedServices: ServiceItemNotNullablePrice[]
	addresses: PublicAddressData[]
	personalData: DoctorPersonalData
}

// eslint-disable-next-line max-lines-per-function
function BookingSection(props: Props) {
	const { userType } = useContext(AppContext)
	const { providedServices, addresses, personalData } = props
	const { savedPetData } = useFetchAndSetPetData()
	const [appointmentInformation, setAppointmentInformation] = useState<AppointmentInformation>({
		selectedPet: null,
		selectedService: null,
		selectedLocation: null,
		selectedDay: null,
		selectedTime: null
	})
	const [availableTimes, setAvailableTimes] = useState<string[]>([])
	const [availableDates, setAvailableDates] = useState<string[]>([])
	const [serviceMinutes, setServiceMinutes] = useState<number>(0)
	const [noAvailableTimesMessage, setNoAvailableTimesMessage] = useState(false)

	useEffect(() => {
		if (savedPetData.length === 1) {
			setAppointmentInformation({
				...appointmentInformation,
				selectedPet: savedPetData[0]
			})
		}
	}, [savedPetData])

	useEffect(() => {
		if (appointmentInformation.selectedDay && appointmentInformation.selectedLocation && appointmentInformation.selectedService) {
			generateTimeSlots(
				appointmentInformation.selectedDay,
				appointmentInformation.selectedLocation,
				appointmentInformation.selectedService,
				setAvailableTimes,
				setServiceMinutes
			)
		}
	}, [appointmentInformation.selectedDay, appointmentInformation.selectedLocation, appointmentInformation.selectedService])

	useEffect(() => {
		if (!appointmentInformation.selectedLocation) return

		const daysOfWeek = appointmentInformation.selectedLocation.times.map(time => getDayIndex(time.dayOfWeek))
		const dates = []
		let date = moment()
		while (dates.length < 10) {
			const dayIndex = date.day() as DayIndeces
			if (daysOfWeek.includes(dayIndex)) dates.push(date.format("dddd, MMMM Do, YYYY"))
			date = date.clone().add(1, "days")
		}
		setAvailableDates(dates)
	}, [appointmentInformation.selectedLocation])

	const anyLocationHasTimes = addresses.some(location => location.times && !_.isEmpty(location.times))

	function MakeBooking () {
		if (userType !== "Patient") return <PatientNotLoggedIn />
		if (!anyLocationHasTimes) return <NoLocationHasTimes personalData = {personalData} />
		if (_.isEmpty(addresses)) return <DoctorDoesNotHaveLocations personalData = {personalData} />
		if (_.isEmpty(providedServices)) return <DoctorDoesNotOfferServices personalData = {personalData} />

		return (
			<div className="bg-white border border-gray-300 rounded p-4 mb-4 card-bottom-margin">
				<div className="border-b pb-2 mb-4">
					<h2>Ready to make a booking?</h2>
				</div>
				<div className = "row">
					<ChoosePet
						savedPetData = {savedPetData}
						appointmentInformation = {appointmentInformation}
						setAppointmentInformation = {setAppointmentInformation}
					/>
				</div>

				<div className = "row">
					<SelectService
						providedServices = {providedServices}
						appointmentInformation = {appointmentInformation}
						setAppointmentInformation = {setAppointmentInformation}
					/>

					<SelectLocation
						addresses = {addresses}
						appointmentInformation = {appointmentInformation}
						setAppointmentInformation = {setAppointmentInformation}
						setNoAvailableTimesMessage = {setNoAvailableTimesMessage}
					/>
				</div>

				<NoAvailableTimes
					noAvailableTimesMessage = {noAvailableTimesMessage}
					personalData = {personalData}
				/>

				<div className = "row">
					<SelectDay
						appointmentInformation = {appointmentInformation}
						setAppointmentInformation = {setAppointmentInformation}
						personalData = {personalData}
						availableDates = {availableDates}
					/>

					<SelectTime
						appointmentInformation = {appointmentInformation}
						setAppointmentInformation = {setAppointmentInformation}
						availableTimes = {availableTimes}
						serviceMinutes = {serviceMinutes}
					/>
				</div>

				<FinalizeBookingButton
					appointmentInformation = {appointmentInformation}
					serviceMinutes = {serviceMinutes}
					personalData = {personalData}
				/>
			</div>
		)
	}

	return <MakeBooking />
}

export default observer(BookingSection)
