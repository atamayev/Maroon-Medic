import React from 'react'
import DoctorHeader from '../doctor-header.js';
import { CardGroup } from 'react-bootstrap'
import DoctorSettingsLinks from '../../../Components/doctor-settings-links.js';
import Header from '../../header.js';

export default function DoctorSettings() {

  return (
    <>
        <Header dropdown = {true} search = {true} className = "d-flex align-items-center justify-content-center w-100"/>
        <DoctorHeader/>
        <CardGroup>
            <DoctorSettingsLinks vetSettingsLink = {"personal-information"} title = {"Personal Information"}/>
            <DoctorSettingsLinks vetSettingsLink = {"privacy"} title = {"Privacy"}/>
            <DoctorSettingsLinks vetSettingsLink = {"login-and-security"} title = {"Login & Security"}/>
        </CardGroup>
    </>
  )
};
