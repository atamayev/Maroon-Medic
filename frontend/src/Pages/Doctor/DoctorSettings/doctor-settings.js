import React from 'react'
import DoctorHeader from '../doctor-header.js';
import { CardGroup } from 'react-bootstrap'
import DoctorSettingsLinks from '../../../Components/doctor-settings-links.js';

export default function DoctorSettings() {

  return (
    <>
        <DoctorHeader/>
        <CardGroup>
            <DoctorSettingsLinks vetSettingsLink = {"personal-information"} title = {"Personal Information"}/>
            <DoctorSettingsLinks vetSettingsLink = {"privacy"} title = {"Privacy"}/>
            <DoctorSettingsLinks vetSettingsLink = {"login-and-security"} title = {"Login & Security"}/>
        </CardGroup>
    </>
  )
};
