import { useState } from "react"
import { Card } from "react-bootstrap"
import SavedConfirmationMessage from "../../../components/saved-confirmation-message"
import { useConfirmationMessage } from "../../../custom-hooks/use-confirmation-message"
import SavedLanguageList from "src/components/language/saved-languages-list"
import { useLanguageOptions, useUpdateDeleteStatuses } from "../../../custom-hooks/account-details-hooks/language"
import { useHandleAddLanguage, useHandleDeleteLanguage } from "../../../custom-hooks/account-details-hooks/callbacks"
import SelectLanguage from "src/components/language/select-language"

interface Props {
  listDetails: PatientListDetails
  spokenLanguages: LanguageItem[]
  setSpokenLanguages: React.Dispatch<React.SetStateAction<LanguageItem[]>>
}

export default function RenderLanguageSection(props: Props) {
  return (
    <Card className = "mb-3">
      <Card.Header>
        Languages
      </Card.Header>
      <Card.Body>
        <RenderIsPatientLanguages {...props} />
      </Card.Body>
    </Card>
  )
}

function RenderIsPatientLanguages(props: Props) {
  const {listDetails, spokenLanguages, setSpokenLanguages} = props
  const [deleteStatuses, setDeleteStatuses] = useState<DeleteStatusesDictionary>({})
  const [languagesConfirmation, setLanguagesConfirmation] = useConfirmationMessage()

  useUpdateDeleteStatuses(deleteStatuses, setDeleteStatuses, spokenLanguages)

  const languageOptions = useLanguageOptions(listDetails.languages, spokenLanguages)

  const handleLanguageChange = useHandleAddLanguage(spokenLanguages, setSpokenLanguages, listDetails, setLanguagesConfirmation, "patient")

  const handleDeleteLanguage = useHandleDeleteLanguage(spokenLanguages, setSpokenLanguages, setLanguagesConfirmation, "patient")

  return (
    <>
      <SelectLanguage
        handleLanguageChange = {handleLanguageChange}
        languageOptions = {languageOptions}
      />
      <SavedLanguageList
        spokenLanguages = {spokenLanguages}
        deleteStatuses = {deleteStatuses}
        setDeleteStatuses = {setDeleteStatuses}
        handleDeleteLanguage = {handleDeleteLanguage}
      />
      <SavedConfirmationMessage
        confirmationMessage = {languagesConfirmation}
        whatIsBeingSaved = "Languages"
      />
    </>
  )
}
