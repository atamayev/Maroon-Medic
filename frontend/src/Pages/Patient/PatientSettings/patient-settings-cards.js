import React from 'react'
import PatientHeader from '../patient-header'
import Header from '../../header'
import { CardGroup } from 'react-bootstrap'
import SettingsLinks from '../../../Components/settings-links';

export default function PatientSettings() {
  return (
    <>
      <Header dropdown = {true} search = {true}/>
      <PatientHeader/>
      <CardGroup>
          <SettingsLinks SettingsLink = {"personal-information"} title = {"Personal Information"}/>
          <SettingsLinks SettingsLink = {"privacy"} title = {"Privacy"}/>
          <SettingsLinks SettingsLink = {"login-and-security"} title = {"Login & Security"}/>
      </CardGroup>
    </>
    )
};
