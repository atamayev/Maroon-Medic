import _ from "lodash"
import PublicDoctorCard from "src/components/public-doctor-card"

interface CategoriesType {
  [key: string]: OrganizationSpecialtyName[]
}

export default function RenderSpecialtiesSection({doctorSpecialties} : {doctorSpecialties: OrganizationSpecialtyName[]}) {
  if (_.isEmpty(doctorSpecialties)) return null
  return (
    <PublicDoctorCard
      title = "Specialties"
      content = {<RenderSpecialties doctorSpecialties = {doctorSpecialties} />}
    />
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
