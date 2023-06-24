import { Card, Button, Form, Alert } from 'react-bootstrap'
import { renderFirstNameSection, renderLastNameSection, renderGenderSection, renderDOBSection } from './personal-info-inputs';

export default function NewAccountForm({
    handleSubmit,
    error,
    newInfo,
    setNewInfo,
    loading})
    {
    
  return (
    <div>
      <Card>
        <Card.Body>
        {error && <Alert variant = "danger">{error}</Alert>}
        <Form onSubmit = {handleSubmit}>
          {renderFirstNameSection(newInfo, setNewInfo)}
          {renderLastNameSection(newInfo, setNewInfo)}
          {renderGenderSection(newInfo, setNewInfo)}
          {renderDOBSection(newInfo, setNewInfo)}
          <Button type = "submit" className = "w-100" disabled = {loading}>Submit</Button>
        </Form>
        </Card.Body>
      </Card>
    </div>
  );
};
