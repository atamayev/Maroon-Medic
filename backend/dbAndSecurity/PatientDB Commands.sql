-- Patient DB Tables:
create database PatientDB;
use PatientDB;
show tables;

CREATE TABLE owner_credentials (
  OwnerID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(150) NOT NULL,
  password VARCHAR(150) NOT NULL,
  Created_at VARCHAR(150) NOT NULL);

  select * from owner_credentials;
-- CREATE TABLE basic_owner_info (
-- basic_owner_info_ID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
-- FirstName VARCHAR(150) NOT NULL,
-- LastName VARCHAR(150) NOT NULL,
-- Gender VARCHAR(10) NOT NULL,
-- DOB_month VARCHAR(150) NOT NULL,
-- DOB_day VARCHAR(150) NOT NULL,
-- DOB_year VARCHAR(150) NOT NULL,
-- Owner_ID INT, 
-- FOREIGN KEY (Owner_ID) REFERENCES owner_credentials(OwnerID));

-- CREATE TABLE patient_addresses(
-- addresses_ID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
-- Owner_ID INT, 
-- FOREIGN KEY (Doc_ID) REFERENCES doc_credentials(DocID),
-- address_line_1 VARCHAR(200),
-- address_line_2 VARCHAR(200), -- apt, suite, etc.
-- city VARCHAR(200), 
-- state VARCHAR(5),
-- zip INT(10),
-- country VARCHAR(100),
-- address_priority INT(5) -- address number is the primary, secondary, etc. 
-- );
CREATE TABLE PatientUUID_reference(
PatientUUID_referenceID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
PatientUUID VARCHAR(150) NOT NULL, 
Created_at DATETIME NOT NULL,
Patient_ID INT unsigned NOT NULL, 
FOREIGN KEY (Patient_ID) REFERENCES owner_credentials(OwnerID)
);
select * from PatientUUID_reference;