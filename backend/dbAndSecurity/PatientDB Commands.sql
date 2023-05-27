-- Patient-side Tables:
CREATE DATABASE MaroonDB;
USE MaroonDB;
SHOW TABLES;

CREATE TABLE Patient_credentials (
  PatientID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(150) NOT NULL,
  password VARCHAR(150) NOT NULL,
  Created_at VARCHAR(150) NOT NULL);

SELECT * FROM Patient_credentials;

CREATE TABLE basic_Patient_info (
basic_Patient_infoID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
FirstName VARCHAR(150) NOT NULL,
LastName VARCHAR(150) NOT NULL,
Gender VARCHAR(150) NOT NULL,
DOB_month VARCHAR(150) NOT NULL,
DOB_day VARCHAR(150) NOT NULL,
DOB_year VARCHAR(150) NOT NULL,
Patient_ID INT unsigned NOT NULL, 
FOREIGN KEY (Patient_ID) REFERENCES Patient_credentials(PatientID));

SELECT * FROM basic_patient_info;

CREATE TABLE PatientUUID_reference(
PatientUUID_referenceID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
PatientUUID VARCHAR(150) NOT NULL, 
Created_at VARCHAR(150) NOT NULL,
Patient_ID INT unsigned NOT NULL, 
FOREIGN KEY (Patient_ID) REFERENCES Patient_credentials(PatientID)
);

SELECT * FROM PatientUUID_reference;
