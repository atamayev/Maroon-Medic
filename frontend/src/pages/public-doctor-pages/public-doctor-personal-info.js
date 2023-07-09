import _ from "lodash"
import { capitalizeFirstLetter } from "../../utils/capitalization"

export default function RenderPersonalInfoSection(props) {
  const { personalData, description } = props
  if (personalData || description) return <h3> {RenderPersonalInfo(personalData)} </h3>
}

function RenderPersonalInfo(props) {
  const {FirstName, LastName} = props
  if (!_.isEmpty(props)) {
    return <> Dr. {""} {capitalizeFirstLetter(FirstName)} {""} {capitalizeFirstLetter(LastName)} </>
  }
}
