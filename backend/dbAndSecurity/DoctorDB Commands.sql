-- Doctor-side Tables:
CREATE DATABASE MaroonDB;
USE MaroonDB;
SHOW TABLES;

CREATE TABLE Doctor_credentials (
  DoctorID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY, # NVI
  email VARCHAR(150) NOT NULL,
  password VARCHAR(150) NOT NULL,
  Created_at VARCHAR(150) NOT NULL, 
  verified BOOLEAN NOT NULL, 
  publiclyAvailable BOOLEAN NOT NULL) AUTO_INCREMENT=1000000;

SELECT * FROM Doctor_credentials;

CREATE TABLE basic_Doctor_info (
basic_Doctor_infoID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
FirstName VARCHAR(150) NULL,
LastName VARCHAR(150) NULL,
Gender VARCHAR(150) NULL,
DOB_month VARCHAR(150) NULL,
DOB_day VARCHAR(150) NULL,
DOB_year VARCHAR(150) NULL,
Doctor_ID INT unsigned NULL, 
FOREIGN KEY (Doctor_ID) REFERENCES Doctor_credentials(DoctorID));

SELECT * FROM basic_Doctor_info;

CREATE TABLE DoctorUUID_reference(
DoctorUUID_referenceID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
DoctorUUID VARCHAR(150) NOT NULL, 
Created_at VARCHAR(150) NOT NULL,
Doctor_ID INT unsigned NOT NULL, 
FOREIGN KEY (Doctor_ID) REFERENCES Doctor_credentials(DoctorID)
);

SELECT * FROM DoctorUUID_reference;

CREATE TABLE descriptions(
descriptionsID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
Description VARCHAR(2500),
Doctor_ID INT unsigned NOT NULL, 
FOREIGN KEY (Doctor_ID) REFERENCES Doctor_credentials(DoctorID));

SELECT * FROM descriptions;

CREATE TABLE insurance_list(
-- Lookup Table
insurance_listID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
Insurance_name VARCHAR(200));

SELECT * FROM insurance_list;

CREATE TABLE insurance_mapping(
insurance_mappingID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
Insurance_ID INT unsigned NOT NULL, 
FOREIGN KEY (Insurance_ID) REFERENCES insurance_list(insurance_listID),
Doctor_ID INT unsigned NOT NULL, 
FOREIGN KEY (Doctor_ID) REFERENCES Doctor_credentials(DoctorID));
    -- Important key constraint:
	ALTER TABLE insurance_mapping
	ADD CONSTRAINT insurance_mapping_constraint
	UNIQUE (Insurance_ID, Doctor_ID);
    
SELECT * FROM insurance_mapping;

-- CREATE TABLE profile_update_history(
-- profile_update_historyID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
-- Updated_at VARCHAR(150), 
-- IP_Address INT unsigned,
-- Doctor_ID INT unsigned NOT NULL, 
-- FOREIGN KEY (Doctor_ID) REFERENCES Doctor_credentials(DoctorID));

-- CREATE TABLE login_history(
-- login_historyID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
-- Login_at VARCHAR(150), 
-- IP_Address INT unsigned,
-- Doctor_ID INT unsigned NOT NULL, 
-- FOREIGN KEY (Doctor_ID) REFERENCES Doctor_credentials(DoctorID));

CREATE TABLE service_and_category_list(
-- Lookup Table
service_and_category_listID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
Category_name VARCHAR(250),
Service_name VARCHAR(250));

SELECT * FROM service_and_category_list;

CREATE TABLE service_mapping(
service_mappingID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
Service_time VARCHAR(10) NOT NULL,
Service_price VARCHAR(10),
Service_and_Category_ID INT unsigned NOT NULL, 
FOREIGN KEY (Service_and_Category_ID) REFERENCES service_and_category_list(service_and_category_listID),
Doctor_ID INT unsigned NOT NULL, 
FOREIGN KEY (Doctor_ID) REFERENCES Doctor_credentials(DoctorID));
    -- Important key constraint:
	ALTER TABLE service_mapping
	ADD CONSTRAINT service_mapping_constraint
	UNIQUE (Service_price, Service_and_Category_ID, Doctor_ID);

SELECT * FROM service_mapping;
    
CREATE TABLE pictures(
picturesID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
picture_link VARCHAR(512),
picture_number INT, -- picture number is the primary, secondary, etc. 
Doctor_ID INT unsigned NOT NULL, 
FOREIGN KEY (Doctor_ID) REFERENCES Doctor_credentials(DoctorID));

CREATE TABLE language_list(
-- Lookup Table
language_listID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
Language_name VARCHAR(150));

SELECT * FROM language_list;

CREATE TABLE language_mapping(
language_mappingID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
Language_ID INT unsigned NOT NULL, 
FOREIGN KEY (Language_ID) REFERENCES language_list(language_listID),
Doctor_ID INT unsigned NOT NULL, 
FOREIGN KEY (Doctor_ID) REFERENCES Doctor_credentials(DoctorID));
    -- Important key constraint:
	ALTER TABLE language_mapping
	ADD CONSTRAINT language_mapping_constraint
	UNIQUE (Language_ID, Doctor_ID);

SELECT * FROM language_mapping;

CREATE TABLE pre_vet_school_list(
-- Lookup Table
pre_vet_school_listID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
School_name VARCHAR(300));

SELECT * FROM pre_vet_school_list;

CREATE TABLE major_list(
-- Lookup Table
major_listID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
Major_name VARCHAR(300));

SELECT * FROM major_list;

CREATE TABLE pre_vet_education_type_list(
-- Lookup Table
pre_vet_education_typeID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
Education_type VARCHAR(150));

SELECT * FROM pre_vet_education_type_list;

CREATE TABLE pre_vet_education_mapping(
pre_vet_education_mappingID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
School_ID INT unsigned NOT NULL, 
FOREIGN KEY (School_ID) REFERENCES pre_vet_school_list(pre_vet_school_listID),
Major_ID INT unsigned NOT NULL, 
FOREIGN KEY (Major_ID) REFERENCES major_list(major_listID),
Education_type_ID INT unsigned NOT NULL, 
FOREIGN KEY (Education_type_ID) REFERENCES pre_vet_education_type_list(pre_vet_education_typeID), 
Start_Date DATE NOT NULL,
End_Date DATE NOT NULL,
Doctor_ID INT unsigned NOT NULL, 
FOREIGN KEY (Doctor_ID) REFERENCES Doctor_credentials(DoctorID));
    -- Important key constraint:
	ALTER TABLE pre_vet_education_mapping
	ADD CONSTRAINT pre_vet_education_mapping_constraint
	UNIQUE (School_ID, Major_ID, Education_type_ID, Doctor_ID);
    
SELECT * FROM pre_vet_education_mapping;

CREATE TABLE vet_school_list(
-- Lookup Table
vet_school_listID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
School_name VARCHAR(300));

SELECT * FROM vet_school_list;

CREATE TABLE vet_education_type_list(
-- Lookup Table
vet_education_typeID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
Education_type VARCHAR(150));

SELECT * FROM vet_education_type_list;

CREATE TABLE vet_education_mapping(
vet_education_mappingID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
School_ID INT unsigned NOT NULL, 
FOREIGN KEY (School_ID) REFERENCES vet_school_list(vet_school_listID),
Education_type_ID INT unsigned NOT NULL, 
FOREIGN KEY (Education_type_ID) REFERENCES vet_education_type_list(vet_education_typeID), 
Start_Date DATE NOT NULL, 
End_Date DATE NOT NULL,
Doctor_ID INT unsigned NOT NULL, 
FOREIGN KEY (Doctor_ID) REFERENCES Doctor_credentials(DoctorID));
	-- Important key constraint:
	ALTER TABLE vet_education_mapping
	ADD CONSTRAINT vet_education_mapping_constraint
	UNIQUE (School_ID, Education_type_ID, Doctor_ID);

SELECT * FROM vet_education_mapping;

CREATE TABLE specialties_list(
-- Lookup Table
specialties_listID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
Organization_name VARCHAR(300),
Specialty_name VARCHAR(300));

SELECT * FROM specialties_list;

CREATE TABLE specialty_mapping(
specialty_mappingID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
Specialty_ID INT unsigned NOT NULL, 
FOREIGN KEY (Specialty_ID) REFERENCES specialties_list(specialties_listID),
Doctor_ID INT unsigned NOT NULL, 
FOREIGN KEY (Doctor_ID) REFERENCES Doctor_credentials(DoctorID));
	-- Important key constraint:
	ALTER TABLE specialty_mapping
	ADD CONSTRAINT specialty_mapping_constraint
	UNIQUE (Specialty_ID, Doctor_ID);

SELECT * FROM specialty_mapping;

CREATE TABLE doctor_addresses(
addressesID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
address_title VARCHAR(200) NOT NULL,
address_line_1 VARCHAR(200) NOT NULL,
address_line_2 VARCHAR(200), -- apt, suite, etc.
city VARCHAR(150) NOT NULL, 
state VARCHAR(150) NOT NULL,
zip VARCHAR(10) NOT NULL,
country VARCHAR(150) NOT NULL,
address_priority INT,
address_public_status BOOLEAN NOT NULL,
Doctor_ID INT unsigned NOT NULL, 
FOREIGN KEY (Doctor_ID) REFERENCES Doctor_credentials(DoctorID));

SELECT * FROM doctor_addresses;

CREATE TABLE phone_numbers(
phone_numbersID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
phone VARCHAR(150),
phone_priority INT, 
address_ID INT unsigned NOT NULL,
FOREIGN KEY (address_ID) REFERENCES Doctor_addresses(addressesID) ON DELETE CASCADE
);

SELECT * FROM phone_numbers;

CREATE TABLE booking_availability(
booking_availabilityID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
Day_of_week VARCHAR(150), -- wheather or not the doc takes on monday
Start_time VARCHAR(10),
End_time VARCHAR(10),
address_ID INT unsigned NOT NULL,
FOREIGN KEY (address_ID) REFERENCES Doctor_addresses(addressesID) ON DELETE CASCADE,
Doctor_ID INT unsigned NOT NULL, 
FOREIGN KEY (Doctor_ID) REFERENCES Doctor_credentials(DoctorID));

SELECT * FROM booking_availability;

CREATE TABLE detailed_booking_availability(
detailed_booking_availabilityID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
Hours_in_advance_scheduling VARCHAR(10),
Latest_Hours_before_booking VARCHAR(10),
Hours_in_advance_cancelation VARCHAR(10),
Appointment_time_slots VARCHAR(10),
Doctor_ID INT unsigned NOT NULL, 
FOREIGN KEY (Doctor_ID) REFERENCES Doctor_credentials(DoctorID));

SELECT * FROM detailed_booking_availability;

ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'password';

flush privileges;

ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'your_new_password';
