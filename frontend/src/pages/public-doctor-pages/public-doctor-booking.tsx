import _ from "lodash"
import dayjs from "dayjs"
import { observer } from "mobx-react"
import { useState, useEffect, useContext } from "react"
import useSetPetDataForBooking from "src/custom-hooks/public-doctor/use-set-pet-data-for-booking"
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
import AppContext from "src/contexts/maroon-context"
import useRetrieveDoctorIDFromParams from "src/custom-hooks/public-doctor/use-retrieve-doctor-id-from-params"

// eslint-disable-next-line max-lines-per-function
function BookingSection() {
	const doctorID = useRetrieveDoctorIDFromParams()
	const appContext = useContext(AppContext)
	const doctorData = appContext.publicDoctorData.retrieveSinglePublicDoctorData(doctorID)
	useSetPetDataForBooking()
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
		if (_.isNull(appointmentInformation.selectedLocation)) return

		const daysOfWeek = appointmentInformation.selectedLocation.times.map(time => getDayIndex(time.dayOfWeek))
		const dates = []
		let date = dayjs()
		while (dates.length < 10) {
			const dayIndex = date.day() as DayIndeces
			if (daysOfWeek.includes(dayIndex)) dates.push(date.format("dddd, MMMM D, YYYY"))
			date = date.clone().add(1, "days")
		}
		setAvailableDates(dates)
	}, [appointmentInformation.selectedLocation])

	const anyLocationHasTimes = doctorData?.doctorAddressData.some(location => !_.isEmpty(location.times))
	if (_.isNil(doctorData)) return null

	if (appContext.auth.userType !== "Patient") return <PatientNotLoggedIn />
	if (anyLocationHasTimes === false) return <NoLocationHasTimes />
	if (_.isEmpty(doctorData.doctorAddressData)) return <DoctorDoesNotHaveLocations />
	if (_.isEmpty(doctorData.doctorServices)) return <DoctorDoesNotOfferServices />

	return (
		<div className="bg-white border border-gray-300 rounded p-4 mb-4 card-bottom-margin">
			<div className="border-b pb-2 mb-4">
				<h2>Ready to make a booking?</h2>
			</div>
			<div className = "row">
				<ChoosePet
					appointmentInformation = {appointmentInformation}
					setAppointmentInformation = {setAppointmentInformation}
				/>
			</div>

			<div className = "row">
				<SelectService
					appointmentInformation = {appointmentInformation}
					setAppointmentInformation = {setAppointmentInformation}
				/>

				<SelectLocation
					appointmentInformation = {appointmentInformation}
					setAppointmentInformation = {setAppointmentInformation}
					setNoAvailableTimesMessage = {setNoAvailableTimesMessage}
				/>
			</div>

			<NoAvailableTimes
				noAvailableTimesMessage = {noAvailableTimesMessage}
			/>

			<div className = "row">
				<SelectDay
					appointmentInformation = {appointmentInformation}
					setAppointmentInformation = {setAppointmentInformation}
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
			/>
		</div>
	)
}

export default observer(BookingSection)
