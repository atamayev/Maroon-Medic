import _ from "lodash"
import PublicDoctorCard from "src/components/public-doctor-card"

export default function LanguageSection({spokenLanguages}: {spokenLanguages: LanguageName[]}) {
  if (_.isEmpty(spokenLanguages)) return null
  return (
    <PublicDoctorCard
      title = "Languages"
      content = {<SpokenLanguages spokenLanguages = {spokenLanguages} />}
    />
  )
}

function SpokenLanguages({spokenLanguages}: {spokenLanguages: LanguageName[]}) {
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
