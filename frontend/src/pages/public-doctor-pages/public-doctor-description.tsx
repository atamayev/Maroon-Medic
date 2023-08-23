import PublicDoctorCard from "src/components/public-doctor-card"

interface Props {
  description: string
}

export default function DescriptionSection(props: Props) {
  if (!props.description) return null
  return <VetDescription {...props}/>
}

function VetDescription(props: Props) {
  const Description = props.description
  return (
    <PublicDoctorCard
      title = "Description"
      content = {<>{Description}</>}
    />
  )
}
