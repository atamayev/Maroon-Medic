import _ from "lodash"
import { Card } from "react-bootstrap"

interface Props {
  doctorSpecialties: OrganizationSpecialtyName[]
}

interface CategoriesType {
  [key: string]: OrganizationSpecialtyName[]
}

export default function RenderSpecialtiesSection(props: Props) {
  const { doctorSpecialties } = props
  if (_.isEmpty(doctorSpecialties)) return null
  return (
    <Card className = "card-bottom-margin">
      <Card.Header>
        Doctor Organizations and Specialites
      </Card.Header>
      <Card.Body>
        <RenderSpecialties doctorSpecialties = {doctorSpecialties} />
      </Card.Body>
    </Card>
  )
}

function RenderSpecialties({doctorSpecialties} : {doctorSpecialties: OrganizationSpecialtyName[]}) {
  const organizations: CategoriesType = {}
  doctorSpecialties.forEach(specialty => {
    if (!organizations[specialty.Organization_name]) {
      organizations[specialty.Organization_name] = []
    }
    (organizations[specialty.Organization_name] as OrganizationSpecialtyName[]).push(specialty)
  })

  return (
    <>
      {Object.entries(organizations).map(([organization, specialties], outerIndex) => (
        <div key = {outerIndex} style = {{ marginBottom: "10px" }}>
          <h3>{organization}</h3>
          {specialties.map((specialty, innerIndex) => (
            <p key = {innerIndex}>
              {specialty.Specialty_name}
            </p>
          ))}
        </div>
      ))}
    </>
  )
}
