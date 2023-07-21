import { Card } from "react-bootstrap"

export default function RenderReviewsSection(props) {
  // const { spokenLanguages } = props

  // if (!_.isEmpty(spokenLanguages)) {
  return (
    <Card className = "card-bottom-margin">
      <Card.Header>
        Reviews
      </Card.Header>
      <Card.Body>
        {renderReviews(props)}
      </Card.Body>
    </Card>
  )
  // }

}

// eslint-disable-next-line no-unused-vars
function renderReviews(props) {

  return (
    <>
      Reviews Section
    </>
  )
}
