import React from 'react'
import { CardGroup } from 'react-bootstrap'
import SettingsLinks from '../../../components/settings-links';
import Header from '../../header'
import PatientHeader from '../patient-header'

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
