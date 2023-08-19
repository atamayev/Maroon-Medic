import _ from "lodash"

interface RenderAvailableDatesProps {
  selectedDay: string;
  personalData: DoctorPersonalData;
  availableDates: string[];
}

const AvailableDates = ({
  selectedDay,
  personalData,
  availableDates,
}: RenderAvailableDatesProps
) => {
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
