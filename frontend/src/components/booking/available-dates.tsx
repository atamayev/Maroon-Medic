import _ from "lodash"

interface Props {
  selectedDay: string;
  personalData: DoctorPersonalData;
  availableDates: string[];
}

const AvailableDates = (props: Props) => {
	const { selectedDay, personalData, availableDates } = props

	if (selectedDay === `Dr. ${_.upperFirst(personalData.LastName || "")} does not currently have any open appointments at this location`) {
		return <option disabled>{selectedDay}</option>
	}

	return (
		<>
			{availableDates.map((date) => (
				<option key={date} value={date}>
					{date}
				</option>
			))}
		</>
	)
}

export default AvailableDates
