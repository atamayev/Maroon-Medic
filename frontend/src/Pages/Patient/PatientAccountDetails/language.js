import React from "react";
import { Card, Button} from "react-bootstrap";
import { handleAddLanguage } from "../../../Custom Hooks/Hooks for Account Details/add";
import { handleDeleteLanguage } from "../../../Custom Hooks/Hooks for Account Details/delete";
import { useConfirmationMessage } from "../../../Custom Hooks/useConfirmationMessage";
import _ from "lodash"

export default function RenderLanguageSection(props) {
  return(
    <Card className="mb-3">
      <Card.Header>
        Languages
      </Card.Header>
      <Card.Body>
        {RenderIsPatientLanguages(props)}
      </Card.Body>
    </Card>
  );
};

function RenderIsPatientLanguages(props) {
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
            'patient'
          )
        }
      >
        <option value = "" disabled>Choose a language</option>
        {_.isArray(props.listDetails[1]) &&
          !_.isEmpty(props.listDetails[1]) &&
          props.listDetails[1]
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
                    'patient'
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
