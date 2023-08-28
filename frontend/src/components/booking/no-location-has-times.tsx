import _ from "lodash"

const NoLocationHasTimes = ({ personalData }: {personalData: DoctorPersonalData}) => {
	return (
		<div className="mb-4 border border-brown-400 bg-yellow-100 rounded">
			<div className="p-4 bg-amber-400 text-white">Ready to make a booking?</div>
			<div className="p-4">
        Dr. {_.upperFirst(personalData.lastName || "")} does not currently have any open time slots for appointments.
			</div>
		</div>
	)
}

export default NoLocationHasTimes
