import { Card } from "react-bootstrap"

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
    <>
      <Card className = "card-bottom-margin">
        <Card.Header>
          Description
        </Card.Header>
        <Card.Body>
          {Description}
        </Card.Body>
      </Card>
    </>
  )
}
