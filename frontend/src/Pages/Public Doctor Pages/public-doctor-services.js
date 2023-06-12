import React from "react";
import { Card } from "react-bootstrap";

export default function RenderServiceSection(props){
  if (props.providedServices.length) {
    return (
      <Card className="card-bottom-margin">
        <Card.Header>
          Provided Services
        </Card.Header>
        <Card.Body>
          {renderProvidedServices(props)}
        </Card.Body>
      </Card>
    )
  }
}

function renderProvidedServices(props){
  const categories = {};
  if (props.providedServices) {
    props.providedServices.forEach(service => {
      if (!categories[service.Category_name]) categories[service.Category_name] = [];
      categories[service.Category_name].push(service);
    });
  }
  return(
      <>
        {Object.entries(categories).map(([category, services]) => (
          <div key={category} style={{ marginBottom: '10px' }}>
            <h3>{category}</h3>
            {services.map(service => (
              <p key={service.service_and_category_listID}>
                {service.Service_name} - {service.Service_time} minutes, $({service.Service_price})
              </p>
            ))}
          </div>
        ))}
      </>
  )
}
