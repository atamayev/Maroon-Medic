import _ from "lodash"
import PublicDoctorCard from "src/components/public-doctor-card"

export default function RenderLanguageSection({spokenLanguages}: {spokenLanguages: LanguageName[]}) {
  if (_.isEmpty(spokenLanguages)) return null
  return (
    <PublicDoctorCard
      title = "Languages"
      content = {<RenderSpokenLanguages spokenLanguages = {spokenLanguages} />}
    />
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
