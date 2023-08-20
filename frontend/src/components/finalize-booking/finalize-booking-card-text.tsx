import moment from "moment"
import { Card } from "react-bootstrap"

interface Props {
  selectedService: ServiceItem,
  selectedLocation: PublicAddressData,
  selectedDay: string,
  selectedTime: string,
  serviceMinutes: number,
  selectedPet: SavedPetItem
}

const FinalizeBookingCardText = (props: Props) => {
  const { selectedService, selectedLocation, selectedDay, selectedTime, serviceMinutes, selectedPet } = props

  return (
    <>
      <Card.Text>
        <span style = {{ display: "block" }}>
          <strong>Pet:</strong> {selectedPet.Name}
        </span>
        <span style = {{ display: "block" }}>
          <strong>Service:</strong> {selectedService.Service_name}
        </span>
        <span style = {{ display: "block" }}>
          <strong>
            Location:
          </strong>
          {selectedLocation.address_title}:  {selectedLocation.address_line_1} {selectedLocation.address_line_2}
        </span>
        <span style = {{ display: "block" }}>
          <strong>Day:</strong> {selectedDay}
        </span>
        <span style = {{ display: "block" }}>
          <strong>Time:</strong> {selectedTime} - {moment(selectedTime, "HH:mm").add(serviceMinutes, "minutes").format("h:mm A")}
        </span>
        <span style = {{ display: "block" }}>
          <strong>Price:</strong> ${selectedService.Service_price}
        </span>
      </Card.Text>
    </>
  )
}

export default FinalizeBookingCardText
