import _ from "lodash"
import { Card } from "react-bootstrap"

interface Props {
  addresses: PublicAddressType[]
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

function RenderLocations(addressesList: PublicAddressType[]) {
  const RenderInstantBook = ({ address }: {address: PublicAddressType}) => {
    if (address.instant_book) return <>Instant book available</>
    return <>Instant book unavailable</>
  }

  const RenderAddressSection = ({ address }: {address: PublicAddressType}) => {
    return (
      <>
        <h4>{address.address_title}</h4>
        <p>{address.address_line_1}</p>
        <p>{address.address_line_2}</p>
        <p>{address.city}, {address.state} {address.zip}, {address.country}</p>
      </>
    )
  }

  const RenderTimesSection = ({ address }: {address: PublicAddressType}) => {
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

  const RenderPhone = ({ address }: {address: PublicAddressType}) => {
    if (!address.Phone) return null
    return <p>Phone: {address.Phone}</p>
  }

  return (
    <>
      {addressesList.map((address: PublicAddressType) => (
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
