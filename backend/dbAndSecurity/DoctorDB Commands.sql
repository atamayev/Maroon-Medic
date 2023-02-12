create database DoctorDB;
use DoctorDB;
show tables;

-- drop table doctor_credentials;
CREATE TABLE Doctor_credentials (
  DoctorID  INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY, # NVI
  email VARCHAR(150) NOT NULL,
  password VARCHAR(150) NOT NULL,
  Created_at VARCHAR(150) NOT NULL) AUTO_INCREMENT=1000000;
  
select * from Doctor_credentials;
-- insert into Doctor_credentials (email, password, Created_at) values
-- ('test email', 'pass', '123');

select * from basic_Doctor_info;
-- drop table basic_Doctor_info;
CREATE TABLE basic_Doctor_info (
basic_Doctor_infoID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
FirstName VARCHAR(150) NOT NULL,
LastName VARCHAR(150) NOT NULL,
Gender VARCHAR(150) NOT NULL,
DOB_month VARCHAR(150) NOT NULL,
DOB_day VARCHAR(150) NOT NULL,
DOB_year VARCHAR(150) NOT NULL,
Doctor_ID INT unsigned NOT NULL, 
FOREIGN KEY (Doctor_ID) REFERENCES Doctor_credentials(DoctorID));

SELECT * FROM Doctor_credentials left JOIN basic_Doctor_info ON Doctor_credentials.DoctorID = basic_Doctor_info.Doctor_ID;
-- WHERE Doctor_credentials.DoctorID = 1000000;

CREATE TABLE DoctorUUID_reference(
DoctorUUID_referenceID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
DoctorUUID VARCHAR(150) NOT NULL, 
Created_at DATETIME NOT NULL,
Doctor_ID INT unsigned NOT NULL, 
FOREIGN KEY (Doctor_ID) REFERENCES Doctor_credentials(DoctorID)
);
-- drop table DoctorUUID_reference; 
select * from DoctorUUID_reference;
-- insert into DoctorUUID_reference (DoctorUUID, Doctor_ID) values
-- ('123', '1000000');

-- SELECT Doctor_ID FROM DoctorUUID_reference WHERE DoctorUUID = '93bba935-b268-402e-b836-11da19cdebb5';
CREATE TABLE phone_numbers(
phone_numbersID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
Phone VARCHAR(150),
Phone_Priority INT, 
Doctor_ID INT unsigned NOT NULL, 
FOREIGN KEY (Doctor_ID) REFERENCES Doctor_credentials(DoctorID));

CREATE TABLE descriptions(
descriptionsID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
Description BLOB,
Doctor_ID INT unsigned NOT NULL, 
FOREIGN KEY (Doctor_ID) REFERENCES Doctor_credentials(DoctorID));

CREATE TABLE profile_update_history(
profile_update_historyID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
Updated_at DATETIME, 
IP_Address INT unsigned,
Doctor_ID INT unsigned NOT NULL, 
FOREIGN KEY (Doctor_ID) REFERENCES Doctor_credentials(DoctorID));

CREATE TABLE login_history(
login_historyID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
Login_at DATETIME, 
IP_Address INT unsigned,
Doctor_ID INT unsigned NOT NULL, 
FOREIGN KEY (Doctor_ID) REFERENCES Doctor_credentials(DoctorID));

CREATE TABLE service_list(
-- Lookup Table
service_listID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
Service_name VARCHAR(250));

CREATE TABLE service_mapping(
service_mapping_ID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
Service_time INT, 
Service_price DECIMAL,
Service_ID INT unsigned NOT NULL, 
FOREIGN KEY (Service_ID) REFERENCES service_list(service_listID),
Doctor_ID INT unsigned NOT NULL, 
FOREIGN KEY (Doctor_ID) REFERENCES Doctor_credentials(DoctorID));

CREATE TABLE pictures(
picturesID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
picture_link VARCHAR(512),
picture_number INT(5), -- picture number is the primary, secondary, etc. 
Doctor_ID INT unsigned NOT NULL, 
FOREIGN KEY (Doctor_ID) REFERENCES Doctor_credentials(DoctorID));

CREATE TABLE language_list(
-- Lookup Table
language_listID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
Language_name VARCHAR(100));

CREATE TABLE language_mapping(
language_mappingID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
Language_ID INT unsigned NOT NULL, 
FOREIGN KEY (Language_ID) REFERENCES language_list(language_listID),
Doctor_ID INT unsigned NOT NULL, 
FOREIGN KEY (Doctor_ID) REFERENCES Doctor_credentials(DoctorID));

CREATE TABLE schools_list(
-- Lookup Table
schoolID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
School_name VARCHAR(300));

CREATE TABLE majors_list(
-- Lookup Table
majorID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
Major_name VARCHAR(300));

CREATE TABLE education_types_list(
-- Lookup Table
education_typeID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
Education_type VARCHAR(300)); -- bachelor, resideny, fellow

CREATE TABLE education_mapping(
education_mapping_ID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
School_ID INT unsigned NOT NULL, 
FOREIGN KEY (School_ID) REFERENCES schools_list(schoolID),
Major_ID INT unsigned NOT NULL, 
FOREIGN KEY (Major_ID) REFERENCES majors_list(majorID),
Education_type_ID INT unsigned NOT NULL, 
FOREIGN KEY (Education_type_ID) REFERENCES education_types_list(education_typeID), 
Start_Date DATE, 
End_Date DATE,
Doctor_ID INT unsigned NOT NULL, 
FOREIGN KEY (Doctor_ID) REFERENCES Doctor_credentials(DoctorID));

CREATE TABLE certifications_list(
-- Lookup Table
certificationID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
Certification_name VARCHAR(300));

CREATE TABLE certifications_mapping(
certifications_mappingID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
Certification_ID INT unsigned NOT NULL, 
FOREIGN KEY (Certification_ID) REFERENCES certifications_list(certifications_listID),
Doctor_ID INT unsigned NOT NULL, 
FOREIGN KEY (Doctor_ID) REFERENCES Doctor_credentials(DoctorID));

CREATE TABLE Doctor_addresses(
addresses_ID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
address_line_1 VARCHAR(200),
address_line_2 VARCHAR(200), -- apt, suite, etc.
city VARCHAR(200), 
state VARCHAR(5),
zip INT(10),
country VARCHAR(100),
address_priority INT(5),-- address number is the primary, secondary, etc. 
Doctor_ID INT unsigned NOT NULL, 
FOREIGN KEY (Doctor_ID) REFERENCES Doctor_credentials(DoctorID));

CREATE TABLE insurances(
-- Lookup Table
insurancesID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
company_name VARCHAR(200));

CREATE TABLE insurance_mapping(
insurance_mappingID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
InsuranceID INT unsigned NOT NULL, 
FOREIGN KEY (InsuranceID) REFERENCES insurances(insurancesID),
Doctor_ID INT unsigned NOT NULL, 
FOREIGN KEY (Doctor_ID) REFERENCES Doctor_credentials(DoctorID));

CREATE TABLE booking_availability(
booking_availabilityID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
Day_of_week VARCHAR(20),
Day_start_time DATETIME, 
Hours_in_advance_scheduling INT,
Doctor_ID INT unsigned NOT NULL, 
FOREIGN KEY (Doctor_ID) REFERENCES Doctor_credentials(DoctorID));

ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'password';

flush privileges;

ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'your_new_password';
