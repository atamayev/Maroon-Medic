import PublicDoctorCard from "src/components/public-doctor-card"

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
    <PublicDoctorCard
      title = "Reviews"
      content = {<RenderReviews props = {props} />}
    />
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
