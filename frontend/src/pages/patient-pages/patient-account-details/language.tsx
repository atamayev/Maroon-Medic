import { useState } from "react"
import { Card } from "react-bootstrap"
import SavedConfirmationMessage from "../../../components/saved-confirmation-message"
import useConfirmationMessage from "../../../custom-hooks/use-confirmation-message"
import SavedLanguageList from "src/components/language/saved-languages-list"
import useGenerateLanguageOptions from "src/custom-hooks/account-details/use-generate-language-options"
import useUpdateDeleteLanguageStatuses from "src/custom-hooks/account-details/use-update-delete-language-statuses"
import useDeleteLanguage from "src/custom-hooks/account-details/callbacks/use-delete-language"
import useAddLanguage from "src/custom-hooks/account-details/callbacks/use-add-language"
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

  useUpdateDeleteLanguageStatuses(deleteStatuses, setDeleteStatuses, spokenLanguages)

  const languageOptions = useGenerateLanguageOptions(listDetails.languages, spokenLanguages)

  const handleLanguageChange = useAddLanguage(spokenLanguages, setSpokenLanguages, listDetails, setLanguagesConfirmation, "patient")

  const handleDeleteLanguage = useDeleteLanguage(spokenLanguages, setSpokenLanguages, setLanguagesConfirmation, "patient")

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
