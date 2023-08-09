import _ from "lodash"
import { Card } from "react-bootstrap"

interface Props {
  addresses: PublicAddressData[]
}

export default function RenderLocationsSection(props: Props) {
  const { addresses } = props
  if (_.isEmpty(addresses)) return null
  return (
    <Card className = "card-bottom-margin">
      <Card.Header>
        Locations
      </Card.Header>
      <Card.Body>
        <RenderLocations {...addresses} />
      </Card.Body>
    </Card>
  )
}

function RenderLocations(addressesList: PublicAddressData[]) {
  const RenderInstantBook = ({ address }: {address: PublicAddressData}) => {
    if (address.instant_book) return <>Instant book available</>
    return <>Instant book unavailable</>
  }

  const RenderAddressSection = ({ address }: {address: PublicAddressData}) => {
    return (
      <>
        <h4>{address.address_title}</h4>
        <p>{address.address_line_1}</p>
        <p>{address.address_line_2}</p>
        <p>{address.city}, {address.state} {address.zip}, {address.country}</p>
      </>
    )
  }

  const RenderTimesSection = ({ address }: {address: PublicAddressData}) => {
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

  const RenderPhone = ({ address }: {address: PublicAddressData}) => {
    if (!address.Phone) return null
    return <p>Phone: {address.Phone}</p>
  }

  return (
    <>
      {addressesList.map((address: PublicAddressData) => (
        <div key = {address.addressesID}>
          <div className = "row">
            <div className = "col-md-6">
              <RenderAddressSection address = {address} />
              <RenderInstantBook address = {address} />
              <RenderPhone address = {address} />
            </div>
            <RenderTimesSection address = {address} />
          </div>
        </div>
      ))}
    </>
  )
}
