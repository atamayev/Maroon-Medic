import _ from "lodash"
import { Card } from "react-bootstrap"

interface Props {
  servicedPets: ServicedPetsType[]
}

interface CategoriesType {
  [key: string]: ServicedPetsType[]
}

export default function RenderServicedPetsSection(props: Props) {
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

function renderServicedPets(servicedPets: ServicedPetsType[]) {
  const categories: CategoriesType = {}
  if (servicedPets) {
    servicedPets.forEach(Pet => {
      if (!categories[Pet.pet_type]) categories[Pet.pet_type] = []
      categories[Pet.pet_type].push(Pet)
    })
  }

  return (
    <>
      {Object.entries(categories).map(([petType, pets], index) => (
        <div key={index} style={{ marginBottom: "10px" }}>
          <h3>{petType}</h3>
          {pets.map((Pet, index) => (
            <p key={index}>
              {Pet.pet}
            </p>
          ))}
        </div>
      ))}
    </>
  )
}
