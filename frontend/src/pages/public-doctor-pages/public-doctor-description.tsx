import { Card } from "react-bootstrap"

interface Props {
  description: string
}

export default function RenderDescriptionSection(props: Props) {
  const { description } = props
  if (description) return <> {RenderDescription(description)} </>
}

function RenderDescription(Description: string) {
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
