import _ from "lodash"
import { Card } from "react-bootstrap"

interface Props {
  spokenLanguages: LanguageName[]
}

export default function RenderLanguageSection(props: Props) {
  const { spokenLanguages } = props
  if (_.isEmpty(spokenLanguages)) return null
  return (
    <Card className = "card-bottom-margin">
      <Card.Header>
        Spoken Languages
      </Card.Header>
      <Card.Body>
        <RenderSpokenLanguages {...spokenLanguages} />
      </Card.Body>
    </Card>
  )
}

function RenderSpokenLanguages(spokenLanguages: LanguageName[]) {
  return (
    <>
      {spokenLanguages.map((language, index) => (
        <p key = {index}>
          {language.Language_name}
        </p>
      ))}
    </>
  )
}
