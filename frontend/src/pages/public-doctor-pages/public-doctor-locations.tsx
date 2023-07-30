import _ from "lodash"
import { Card } from "react-bootstrap"

interface Props {
  addresses: AddressType[]
}

export default function RenderLocationsSection(props: Props) {
  const { addresses } = props
  if (!_.isEmpty(addresses)) {
    return (
      <Card className = "card-bottom-margin">
        <Card.Header>
          Locations
        </Card.Header>
        <Card.Body>
          {renderLocations(addresses)}
        </Card.Body>
      </Card>
    )
  }
}

function renderLocations(addressesList: AddressType[]) {
  const renderInstantBook = (address: AddressType) => {
    if (address.instant_book) return <>Instant book available</>
    return <>Instant book unavailable</>
  }

  const renderAddressSection = (address: AddressType) => {
    return (
      <>
        <h4>{address.address_title}</h4>
        <p>{address.address_line_1}</p>
        <p>{address.address_line_2}</p>
        <p>{address.city}, {address.state} {address.zip}, {address.country}</p>
      </>
    )
  }

  const renderTimesSection = (address: AddressType) => {
    return (
      <div className = "col-md-6">
        <h5>Working hours:</h5>
        {address.times.map((time, index) => (
          <p key = {index}>
            {time.Day_of_week}: {time.Start_time} - {time.End_time}
          </p>
        ))}
      </div>
    )
  }

  const renderPhone = (address: AddressType) => {
    if (address.phone) return <p>Phone: {address.phone}</p>
  }

  return addressesList.map((address: AddressType) => (
    <div key = {address.addressesID}>
      <div className = "row">
        <div className = "col-md-6">
          {renderAddressSection(address)}
          {renderInstantBook(address)}
          {renderPhone(address)}
        </div>
        {renderTimesSection(address)}
      </div>
    </div>
  ))
}
