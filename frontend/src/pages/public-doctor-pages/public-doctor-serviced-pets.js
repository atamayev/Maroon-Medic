import _ from "lodash"
import { Card } from "react-bootstrap"

export default function RenderServicedPetsSection(props) {
  const { servicedPets } = props
  if (!_.isEmpty(servicedPets)) {
    return (
      <Card className = "card-bottom-margin">
        <Card.Header>
          Serviced Pets
        </Card.Header>
        <Card.Body>
          {renderServicedPets(servicedPets)}
        </Card.Body>
      </Card>
    )
  }
}

function renderServicedPets(servicedPets) {
  const categories = {}
  if (servicedPets) {
    servicedPets.forEach(Pet => {
      if (!categories[Pet.pet_type]) categories[Pet.pet_type] = []
      categories[Pet.pet_type].push(Pet)
    })
  }

  return (
    <>
      {Object.entries(categories).map(([petType, pets]) => (
        <div key = {petType} style = {{ marginBottom: "10px" }}>
          <h3>{petType}</h3>
          {pets.map(Pet => (
            <p key = {Pet.pet_listID}>
              {Pet.pet}
            </p>
          ))}
        </div>
      ))}
    </>
  )
}
