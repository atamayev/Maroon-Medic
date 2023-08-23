import { Link } from "react-router-dom"
import { Card } from "react-bootstrap"
import Button from "src/components/button"

export default function RenderPersonalInfoLinkSection() {
  return (
    <Card className = "mb-3">
      <Card.Body>
        Looking to edit your Profile Information? {""}
        <Link to = {"/settings/personal-information"}>
          <Button
            className = "p-1"
            colorClass = "bg-green-600"
            hoverClass = "hover:bg-green-700"
            title = "Edit Personal Information"
          />
        </Link>
      </Card.Body>
    </Card>
  )
}
