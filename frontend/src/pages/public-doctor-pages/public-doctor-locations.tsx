import _ from "lodash"
import { Card } from "react-bootstrap"
import AddressSection from "src/components/public-doctor-locations/address-section"
import TimesSection from "src/components/public-doctor-locations/times-section"

export default function RenderLocationsSection( { addresses } : {addresses: PublicAddressData[]}) {
  if (_.isEmpty(addresses)) return null
  return (
    <Card className = "card-bottom-margin">
      <Card.Header>
        Locations
      </Card.Header>
      <Card.Body>
        <RenderLocations addressesList = {addresses} />
      </Card.Body>
    </Card>
  )
}

function RenderLocations({addressesList}: {addressesList: PublicAddressData[]}) {
  const InstantBook = ({ address }: {address: PublicAddressData}) => {
    if (address.instant_book) return <>Instant book available</>
    return <>Instant book unavailable</>
  }

  const PhoneSection = ({ address }: {address: PublicAddressData}) => {
    if (!address.Phone) return null
    return <p>Phone: {address.Phone}</p>
  }

  return (
    <>
      {addressesList.map((address: PublicAddressData) => (
        <div key = {address.addressesID}>
          <div className = "row">
            <div className = "col-md-6">
              <AddressSection address = {address} />
              <InstantBook address = {address} />
              <PhoneSection address = {address} />
            </div>
            <TimesSection address = {address} />
          </div>
        </div>
      ))}
    </>
  )
}
