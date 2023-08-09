import { Card } from "react-bootstrap"

type ReviewsType = {
  [key: string]: string
}

interface Props {
  reviews?: ReviewsType[]
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
        <RenderReviews props = {props}/>
      </Card.Body>
    </Card>
  )
  // }

}

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
function RenderReviews({props} : {props: Props}) {

  return (
    <>
      Reviews Section
    </>
  )
}
