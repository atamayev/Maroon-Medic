import React from "react";
import { Card } from "react-bootstrap";

export default function RenderLocationsSection(props){
  if (props.addresses.length) {
    return (
      <Card className="card-bottom-margin">
        <Card.Header>
          Locations
        </Card.Header>
        <Card.Body>
          {renderLocations(props.addresses)}
        </Card.Body>
      </Card>
    )
  }
}

function renderLocations(addressesList){
  return addressesList.map((address, index) => {
    return (
        <div key={index}>
          <div className="row">
            <div className="col-md-6">
            <h4>{address.address_title}</h4>
            <p>{address.address_line_1}</p>
            <p>{address.address_line_2}</p>
            <p>{address.city}, {address.state} {address.zip}, {address.country}</p>
            {address.instant_book ? (<>Instant book available</>) : (<>Instant book unavailable</>)}
            <p>Phone: {address.phone}</p>
            </div>
            <div className="col-md-6">
                <h5>Working hours:</h5>
                {address.times.map((time, index) => (
                <p key={index}>{time.Day_of_week}: {time.Start_time} - {time.End_time}</p>
                ))}
            </div>
          </div>
        </div>
    )
  })
};
