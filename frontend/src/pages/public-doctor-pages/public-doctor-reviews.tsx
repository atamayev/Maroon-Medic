import { Card } from "react-bootstrap"

interface Props {

}

export default function RenderReviewsSection(props: Props) {
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

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
function renderReviews(props: Props) {

  return (
    <>
      Reviews Section
    </>
  )
}
