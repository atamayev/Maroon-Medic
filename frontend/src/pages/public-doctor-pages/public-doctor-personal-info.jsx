import _ from "lodash"

export default function RenderPersonalInfoSection(props) {
  const { personalData, description } = props
  if (personalData || description) return <h3> {RenderPersonalInfo(personalData)} </h3>
}

function RenderPersonalInfo(props) {
  const {FirstName, LastName} = props
  if (!_.isEmpty(props)) {
    return <> Dr. {""} {_.upperFirst(FirstName || "")} {""} {_.upperFirst(LastName || "")} </>
  }
}
