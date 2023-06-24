import _ from "lodash"
import { Card, Button} from "react-bootstrap";
import { handleAddLanguage } from "../../../custom-hooks/account-details-hooks/add";
import { handleDeleteLanguage } from "../../../custom-hooks/account-details-hooks/delete";
import { useConfirmationMessage } from "../../../custom-hooks/use-confirmation-message";

export default function RenderLanguageSection(props) {
  return(
    <Card className = "mb-3">
      <Card.Header>
        Languages
      </Card.Header>
      <Card.Body>
        {RenderIsVetLanguages(props)}
      </Card.Body>
    </Card>
  );
};

function RenderIsVetLanguages(props) {
  const {listDetails, spokenLanguages, setSpokenLanguages} = props;
  const [languagesConfirmation, setLanguagesConfirmation] = useConfirmationMessage();

  const renderMessageSection = () => {
    return (
      <span className = {`fade ${languagesConfirmation.messageType ? 'show' : ''}`}>
        {languagesConfirmation.messageType === 'saved' && 'Languages saved!'}
        {languagesConfirmation.messageType === 'same' && 'Same Language data!'}
        {languagesConfirmation.messageType === 'problem' && 'Problem Saving Languages!'}
        {languagesConfirmation.messageType === 'none' && 'No languages selected'}
      </span>
    )
  }

  const renderSelectLanguageSection = () => {
    return (
      <select
        id = "language"
        name = "language"
        value = {""}
        onChange = {(e) => 
          handleAddLanguage(
            e.target.value,
            spokenLanguages,
            setSpokenLanguages,
            listDetails,
            setLanguagesConfirmation,
            'doctor'
          )
        }
      >
      <option value = "" disabled>Choose a language</option>
      {_.isArray(listDetails.languages) &&
        !_.isEmpty(listDetails.languages) &&
        listDetails.languages
          .filter((language) => !spokenLanguages.find((spoken) => spoken.language_listID === language.language_listID))
          .map((language) => (
            <option key = {language?.language_listID} value = {language?.language_listID}>
              {language?.Language_name}
            </option>
          ))}
      </select>
    )
  }

  const renderSavedLanguageList = () => {
    return (
      <ul>
        {_.isArray(spokenLanguages) &&
          spokenLanguages.map((language) => (
            <li key = {language.language_listID}>
              {language.Language_name}
              <Button 
                onClick = {() => 
                  handleDeleteLanguage(
                    language, 
                    spokenLanguages, 
                    setSpokenLanguages, 
                    setLanguagesConfirmation,
                    'doctor'
                  )}
              >X</Button>
            </li>
          ))}
      </ul>
    )
  }
  
  return(
    <div>
      {renderSelectLanguageSection()}
      {renderSavedLanguageList()}
      {renderMessageSection()}
    </div>
  );
};
