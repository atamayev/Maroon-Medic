import _ from "lodash"
import { Card } from 'react-bootstrap';

export default function LoginHistory(props) {
  const {loginHistoryItem} = props;

  return (
    <Card className = 'mb-3'>
      <Card.Body>
        <Card.Title>Login Time: {loginHistoryItem.Login_at} </Card.Title>
      </Card.Body>
    </Card>
  );
}
