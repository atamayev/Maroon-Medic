import React from 'react'
import {Card, Button, Form, Alert } from 'react-bootstrap'
import FormGroup from './form-group';

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
  const currentYear = new Date().getFullYear();
  const years = Array.from({length: 63}, (_, i) => currentYear - i - 18); // Renders an array from 18 years ago to 63 minus that year.  

  return (
    <div>
      <Card>
        <Card.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <FormGroup 
            id = "FirstName"
            className={'mb-3'}
            label = "First Name:"
            required
            type = "text"
            onChange={event => setNewInfo({...newInfo, FirstName: event.target.value})}
          />
          <FormGroup 
            className={'mb-3'}
            id = "LastName"
            label = "Last Name:"
            type = "text"
            onChange={event => setNewInfo({...newInfo, LastName: event.target.value})}
            required
          />
          
          <FormGroup
            as="select"
            className={'mb-3'}
            id="Gender"
            label="Gender:"
            required={true}
            value={newInfo.Gender}
            onChange={event => setNewInfo({...newInfo, Gender: event.target.value})}
          >
            <option value="">Select</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="other">Other</option>
          </FormGroup>

          <Form.Group id = "DOB" className={'mb-3'}>
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
                  <option key={year + 1} value={year + 1}>
                    {year + 1}
                  </option>
                ))}
              </select>
            </label>
          </Form.Group>
          
          <Button type="submit" className = "w-100" disabled = {loading}>Submit</Button>
        </Form>
        </Card.Body>
      </Card>
    </div>
  );
};
