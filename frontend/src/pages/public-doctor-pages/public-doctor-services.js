import _ from "lodash"
import { Card } from "react-bootstrap"

export default function RenderServiceSection(props) {
  const { providedServices } = props
  if (!_.isEmpty(providedServices)) {
    return (
      <Card className = "card-bottom-margin">
        <Card.Header>
          Provided Services
        </Card.Header>
        <Card.Body>
          {renderProvidedServices(providedServices)}
        </Card.Body>
      </Card>
    )
  }
}

function renderProvidedServices(providedServices) {
  const categories = {}
  if (providedServices) {
    providedServices.forEach(service => {
      if (!categories[service.Category_name]) categories[service.Category_name] = []
      categories[service.Category_name].push(service)
    })
  }

  return (
    <>
      {Object.entries(categories).map(([category, services]) => (
        <div key = {category} style = {{ marginBottom: "10px" }}>
          <h3>{category}</h3>
          {services.map(service => (
            <p key = {service.service_and_category_listID}>
              {service.Service_name} - {service.Service_time}, ${service.Service_price}
            </p>
          ))}
        </div>
      ))}
    </>
  )
}
