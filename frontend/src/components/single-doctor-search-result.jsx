import _ from "lodash"
import { Card, Button } from "react-bootstrap"
import { Link } from "react-router-dom"

export default function SingleDoctor(props) {
  const { FirstName, LastName, NVI } = props.doctorData
  return (
    <Card style = {{ margin: "0 10px", gridColumn: "span 1", gridRow: "span 1" }}>
      <Card.Body>
        <Card.Title>  Dr. {_.upperFirst(FirstName || "")} {_.upperFirst(LastName || "")}</Card.Title>
        <Link to = {`/vet/${NVI}`}>
          <Button variant = "primary">
            <p>Click Me! NVI: {NVI}</p>
          </Button>
        </Link>
      </Card.Body>
    </Card>
  )
}
