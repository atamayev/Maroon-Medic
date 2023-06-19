import _ from "lodash"
import React from "react";
import { Card, Button} from "react-bootstrap";
import { handleAddLanguage } from "../../../custom-hooks/account-details-hooks/add";
import { handleDeleteLanguage } from "../../../custom-hooks/account-details-hooks/delete";
import { useConfirmationMessage } from "../../../custom-hooks/use-confirmation-message";

export default function RenderLanguageSection(props) {
  return(
    <Card className="mb-3">
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
  const [languagesConfirmation, setLanguagesConfirmation] = useConfirmationMessage();

  return(
    <div>
      <select
        id="language"
        name="language"
        value={""}
        onChange={(e) => 
          handleAddLanguage(
            e.target.value,
            props.spokenLanguages,
            props.setSpokenLanguages,
            props.listDetails,
            setLanguagesConfirmation,
            'doctor'
          )
        }
      >
        <option value = "" disabled>Choose a language</option>
        {_.isArray(props.listDetails[0]) &&
          !_.isEmpty(props.listDetails[0]) &&
          props.listDetails[0]
            .filter((language) => !props.spokenLanguages.find((spoken) => spoken.language_listID === language.language_listID))
            .map((language) => (
              <option key={language?.language_listID} value={language?.language_listID}>
                {language?.Language_name}
              </option>
            ))}
      </select>
      <ul>
        {_.isArray(props.spokenLanguages) &&
          props.spokenLanguages.map((language) => (
            <li key={language.language_listID}>
              {language.Language_name}
              <Button 
                onClick = {() => 
                  handleDeleteLanguage(
                    language, 
                    props.spokenLanguages, 
                    props.setSpokenLanguages, 
                    setLanguagesConfirmation,
                    'doctor'
                  )}
              >X</Button>
            </li>
          ))}
      </ul>
      <span className={`fade ${languagesConfirmation.messageType ? 'show' : ''}`}>
        {languagesConfirmation.messageType === 'saved' && 'Languages saved!'}
        {languagesConfirmation.messageType === 'same' && 'Same Language data!'}
        {languagesConfirmation.messageType === 'problem' && 'Problem Saving Languages!'}
        {languagesConfirmation.messageType === 'none' && 'No languages selected'}
      </span>
    </div>
  );
};
