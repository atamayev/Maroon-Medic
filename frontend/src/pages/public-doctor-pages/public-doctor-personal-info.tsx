import _ from "lodash"


export default function RenderPersonalInfoSection( {personalData} : { personalData: DoctorPersonalData }) {
  if (_.isEmpty(personalData)) return null

  return (
    <h3>
      <RenderPersonalInfo personalData = {personalData} />
    </h3>
  )
}

function RenderPersonalInfo({personalData}: {personalData: DoctorPersonalData}) {
  const {FirstName, LastName} = personalData
  return (
    <>
      Dr. {""} {_.upperFirst(FirstName || "")}
      {""} {_.upperFirst(LastName || "")}
    </>
  )
}
