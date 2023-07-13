import _ from "lodash"
import { Card, Button } from "react-bootstrap"
import { Link } from "react-router-dom"

export default function SearchResults(props) {
  const { data } = props
  return (
    <div className = "card-container" style = {{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gridGap: "16px" }}>
      {data.map((item) => {
        const { FirstName, LastName, NVI } = item
        return (
          <Card key = {NVI} style = {{ margin: "0 10px", gridColumn: "span 1", gridRow: "span 1" }}>
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
      })}
    </div>
  )
}
