import _ from "lodash"
import { Card } from "react-bootstrap"

export default function RenderLanguageSection({spokenLanguages}: {spokenLanguages: LanguageName[]}) {
  if (_.isEmpty(spokenLanguages)) return null
  return (
    <Card className = "card-bottom-margin">
      <Card.Header>
        Spoken Languages
      </Card.Header>
      <Card.Body>
        <RenderSpokenLanguages spokenLanguages = {spokenLanguages} />
      </Card.Body>
    </Card>
  )
}

function RenderSpokenLanguages({spokenLanguages}: {spokenLanguages: LanguageName[]}) {
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
