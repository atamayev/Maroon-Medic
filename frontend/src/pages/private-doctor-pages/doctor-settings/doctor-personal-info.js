
import { Card, Button, Form } from 'react-bootstrap'
import { NonDoctorAccess } from '../../../components/user-type-unauth.js';
import { useConfirmationMessage } from '../../../custom-hooks/use-confirmation-message.js';
import useSimpleUserVerification from '../../../custom-hooks/use-simple-user-verification.js';
import { handleSavePersonalInfo, usePersonalInfo } from '../../../custom-hooks/fetch-and-save-personal-info.js';
import { renderFirstNameSection, renderLastNameSection, renderDOBSection, renderGenderSection, renderMessageSection } from '../../../components/personal-info-inputs.js';
import Header from '../../header.js';
import DoctorHeader from '../doctor-header.js';

const handleSave = (e, personalInfo, setPersonalInfoConfirmation, userType) => {
  e.preventDefault();
  handleSavePersonalInfo(personalInfo, setPersonalInfoConfirmation, userType)
};

export default function DoctorPersonalInfo() {
  const { userType } = useSimpleUserVerification();
  const {personalInfo, setPersonalInfo } = usePersonalInfo(userType)
  const [personalInfoConfirmation, setPersonalInfoConfirmation] = useConfirmationMessage();

  if (userType !== 'Doctor') return <NonDoctorAccess/>
  
  return (
    <div>
      <Header dropdown = {true}/>
      <DoctorHeader/>
      <Card>
        <Card.Body>
          <Form onSubmit = {e => handleSave(e, personalInfo, setPersonalInfoConfirmation, userType)}>
            {renderFirstNameSection(personalInfo, setPersonalInfo)}
            {renderLastNameSection(personalInfo, setPersonalInfo)}
            {renderGenderSection(personalInfo, setPersonalInfo)}
            {renderDOBSection(personalInfo, setPersonalInfo)}
            <Button type = "submit" className = "btn btn-primary w-100">Save</Button>
            {renderMessageSection(personalInfoConfirmation)}
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};
