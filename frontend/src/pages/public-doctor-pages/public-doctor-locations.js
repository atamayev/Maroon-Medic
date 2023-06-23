import _ from "lodash"
import React from "react";
import { Card } from "react-bootstrap";

export default function RenderLocationsSection(props) {
  const { addresses } = props;
  if (!_.isEmpty(addresses)) {
    return (
      <Card className="card-bottom-margin">
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

function renderLocations(addressesList) {
  const renderInstantBook = (address) => {
    if (address.instant_book) return <>Instant book available</>
    return <>Instant book unavailable</>
  }

  const renderAddressSection = (address) => {
    return (
      <>
        <h4>{address.address_title}</h4>
        <p>{address.address_line_1}</p>
        <p>{address.address_line_2}</p>
        <p>{address.city}, {address.state} {address.zip}, {address.country}</p>
      </>
    )
  }

  const renderTimesSection = (address) => {
    return (
      <div className="col-md-6">
          <h5>Working hours:</h5>
          {address.times.map((time, index) => (
          <p key={index}>{time.Day_of_week}: {time.Start_time} - {time.End_time}</p>
          ))}
      </div>
    )
  }

  return addressesList.map((address, index) => {
    return (
      <div key={index}>
        <div className="row">
          <div className="col-md-6">
            {renderAddressSection(address)}
            {renderInstantBook(address)}
            <p>Phone: {address.phone}</p>
          </div>
          {renderTimesSection(address)}
        </div>
      </div>
    )
  })
};
