import _ from "lodash"

interface Props {
  personalData: PersonalDataType
}

export default function RenderPersonalInfoSection(props: Props) {
  const { personalData } = props
  if (!personalData) return null
  return <h3> {RenderPersonalInfo(personalData)} </h3>
}

function RenderPersonalInfo(props: PersonalDataType) {
  const {FirstName, LastName} = props
  return <> Dr. {""} {_.upperFirst(FirstName || "")} {""} {_.upperFirst(LastName || "")} </>
}
