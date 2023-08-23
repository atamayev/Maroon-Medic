import PublicDoctorCard from "src/components/public-doctor-card"

interface Props {
  description: string
}

export default function RenderDescriptionSection(props: Props) {
  if (!props.description) return null
  return <> <RenderDescription {...props}/> </>
}

function RenderDescription(props: Props) {
  const Description = props.description
  return (
    <PublicDoctorCard
      title = "Description"
      content = {<>{Description}</>}
    />
  )
}
