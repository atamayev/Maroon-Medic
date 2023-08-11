import _ from "lodash"
import { Card } from "react-bootstrap"

interface Props {
  servicedPets: ServicedPetData[]
}

interface CategoriesType {
  [key: string]: ServicedPetData[]
}

export default function RenderServicedPetsSection(props: Props) {
  const { servicedPets } = props
  if (_.isEmpty(servicedPets)) return null
  return (
    <Card className = "card-bottom-margin">
      <Card.Header>
        Serviced Pets
      </Card.Header>
      <Card.Body>
        <RenderServicedPets servicedPets = {servicedPets} />
      </Card.Body>
    </Card>
  )
}

function RenderServicedPets({servicedPets} : {servicedPets: ServicedPetData[]}) {
  const categories: CategoriesType = {}
  if (servicedPets) {
    servicedPets.forEach(Pet => {
      if (!categories[Pet.pet_type]) categories[Pet.pet_type] = []
      categories[Pet.pet_type].push(Pet)
    })
  }

  return (
    <>
      {Object.entries(categories).map(([petType, pets], outerIndex) => (
        <div key = {outerIndex} style = {{ marginBottom: "10px" }}>
          <h3>{petType}</h3>
          {pets.map((Pet, innerIndex) => (
            <p key = {innerIndex}>
              {Pet.pet}
            </p>
          ))}
        </div>
      ))}
    </>
  )
}
