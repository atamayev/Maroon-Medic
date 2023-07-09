import _ from "lodash"
import { Card } from "react-bootstrap"

export default function RenderSpecialtiesSection(props) {
  const { doctorSpecialties } = props
  if (!_.isEmpty(doctorSpecialties)) {
    return (
      <Card className = "card-bottom-margin">
        <Card.Header>
          Doctor Organizations and Specialites
        </Card.Header>
        <Card.Body>
          {renderSpecialties(doctorSpecialties)}
        </Card.Body>
      </Card>
    )
  }
}

function renderSpecialties(doctorSpecialties) {
  const organizations = {}
  if (doctorSpecialties) {
    doctorSpecialties.forEach(specialty => {
      if (!organizations[specialty.Organization_name]) organizations[specialty.Organization_name] = []
      organizations[specialty.Organization_name].push(specialty)
    })
  }

  return (
    <>
      {Object.entries(organizations).map(([organization, specialties]) => (
        <div key = {organization} style = {{ marginBottom: "10px" }}>
          <h3>{organization}</h3>
          {specialties.map(specialty => (
            <p key = {specialty.specialties_listID}>
              {specialty.Specialty_name}
            </p>
          ))}
        </div>
      ))}
    </>
  )
}
