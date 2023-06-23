import React from 'react'
import { Card } from 'react-bootstrap';

export default function LoginHistory(props) {
    const {loginHistoryItem} = props;
    return (
        <Card className = 'mb-3'>
          <Card.Body>
            <Card.Title>Login Time: {loginHistoryItem.Login_at} </Card.Title>
              <Card.Text>
                IP Address: {loginHistoryItem.IP_Address}
              </Card.Text>
          </Card.Body>
        </Card>
      );
}
