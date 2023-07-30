import _ from "lodash"
import { Card } from "react-bootstrap"

interface Props {
  spokenLanguages: spokenLanguagesType[]
}

type spokenLanguagesType = {
  Language_name: string
}

export default function RenderLanguageSection(props: Props) {
  const { spokenLanguages } = props
  if (!_.isEmpty(spokenLanguages)) {
    return (
      <Card className = "card-bottom-margin">
        <Card.Header>
          Spoken Languages
        </Card.Header>
        <Card.Body>
          {renderSpokenLanguages(spokenLanguages)}
        </Card.Body>
      </Card>
    )
  }
}

function renderSpokenLanguages(spokenLanguages: spokenLanguagesType[]) {
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
