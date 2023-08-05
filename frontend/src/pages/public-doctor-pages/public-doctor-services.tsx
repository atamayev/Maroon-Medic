import _ from "lodash"
import { Card } from "react-bootstrap"

interface Props {
  providedServices: ServiceItemType[]
}

interface CategoriesType {
  [key: string]: ServiceItemType[]
}

export default function RenderServiceSection(props: Props) {
  const { providedServices } = props
  if (_.isEmpty(providedServices)) return null
  return (
    <Card className = "card-bottom-margin">
      <Card.Header>
        Provided Services
      </Card.Header>
      <Card.Body>
        <RenderProvidedServices {...providedServices} />
      </Card.Body>
    </Card>
  )
}

function RenderProvidedServices(providedServices: ServiceItemType[]) {
  const categories: CategoriesType = {}
  if (providedServices) {
    providedServices.forEach(service => {
      if (!categories[service.Category_name]) categories[service.Category_name] = []
      categories[service.Category_name].push(service)
    })
  }

  return (
    <>
      {Object.entries(categories).map(([category, services], index) => (
        <div key = {index} style = {{ marginBottom: "10px" }}>
          <h3>{category}</h3>
          {services.map((service, index) => (
            <p key = {index}>
              {service.Service_name} - {service.Service_time}, ${service.Service_price}
            </p>
          ))}
        </div>
      ))}
    </>
  )
}
