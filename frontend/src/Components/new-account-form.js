import React from 'react'
import {Card, Button, Form, Alert } from 'react-bootstrap'

export default function NewAccountForm({
    handleSubmit,
    error,
    newInfo,
    setNewInfo,
    loading})
    {
    
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  const days = [...Array(31).keys()].map(i => i + 1);
  const years = [...Array(100).keys()].map(i => i + new Date().getFullYear() - 100);

  return (
    <div>
        <Card>
      <Card.Body>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group id = "FirstName">
          <Form.Label> First Name: </Form.Label>
              <Form.Control required type="text" value={newInfo.FirstName} onChange={event => setNewInfo({...newInfo, FirstName: event.target.value})} />
        </Form.Group>
        <br />
        
        <Form.Group id = "LastName">
        <Form.Label>Last Name: </Form.Label>
            <Form.Control required type="text" value={newInfo.LastName} onChange={event => setNewInfo({...newInfo, LastName: event.target.value})} />
        </Form.Group>
        <br />
        
        <Form.Group id = "Gender">
        <Form.Label> Gender: </Form.Label>
            <select required value={newInfo.Gender} onChange={event => setNewInfo({...newInfo, Gender: event.target.value})}>
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
            </select>
        </Form.Group>
        <br />
        <Form.Group id = "DOB">

        <label>
        Month:
        <select required defaultValue = "" value={newInfo.DOB_month} onChange={event => setNewInfo({...newInfo, DOB_month: event.target.value})}>
          <option value="" disabled>
            Select Month
          </option>
          {months.map(month => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      </label>
      <label>
        Day:
        <select required defaultValue = "" value={newInfo.DOB_day} onChange={event => setNewInfo({...newInfo, DOB_day: event.target.value})}>
          <option value="" disabled>
            Select Day
          </option>
          {days.map(day => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>
      </label>
      <label>
        Year:
        <select required defaultValue = "" value={newInfo.DOB_year} onChange={event => setNewInfo({...newInfo, DOB_year: event.target.value})}>
          <option value="" disabled>
            Select Year
          </option>
          {years.map(year => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </label>
        </Form.Group>
        <br />
         <Button type="submit" className = "w-100" disabled = {loading}>Submit</Button>
      </Form>
      </Card.Body>
    </Card>
    </div>
  )
}
