import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"

interface Props {
  SettingsLink: string,
  title: string
}

export default function SettingsLinks(props: Props): JSX.Element {
  const { SettingsLink, title } = props

  return (
    <Link to = {`${SettingsLink}`} style = {{ textDecoration: "none" }}>
      <Card border = "primary" style = {{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
        </Card.Body>
      </Card>
    </Link>
  )
}
