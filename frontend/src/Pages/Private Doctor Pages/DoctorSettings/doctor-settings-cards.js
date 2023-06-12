import React from 'react'
import DoctorHeader from '../doctor-header.js';
import { CardGroup } from 'react-bootstrap'
import SettingsLinks from '../../../Components/settings-links.js';
import Header from '../../header.js';

export default function DoctorSettingsCards() {
  return (
    <>
      <Header dropdown = {true}/>
      <DoctorHeader/>
      <CardGroup>
        <SettingsLinks SettingsLink = {"personal-information"} title = {"Personal Information"}/>
        <SettingsLinks SettingsLink = {"privacy"} title = {"Privacy"}/>
        <SettingsLinks SettingsLink = {"login-and-security"} title = {"Login & Security"}/>
      </CardGroup>
    </>
  )
};
