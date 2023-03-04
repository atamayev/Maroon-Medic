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

-- delete from basic_Doctor_info where basic_Doctor_infoID between 112 and 115;
select * from basic_Doctor_info;

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
SELECT * FROM Doctor_credentials left JOIN basic_Doctor_info ON Doctor_credentials.DoctorID = basic_Doctor_info.Doctor_ID where email = 'abc@123.com5';
-- WHERE Doctor_credentials.DoctorID = 1000000;

CREATE TABLE DoctorUUID_reference(
DoctorUUID_referenceID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
DoctorUUID VARCHAR(150) NOT NULL, 
Created_at VARCHAR(150) NOT NULL,
Doctor_ID INT unsigned NOT NULL, 
FOREIGN KEY (Doctor_ID) REFERENCES Doctor_credentials(DoctorID)
);
-- drop table DoctorUUID_reference; 
select * from DoctorUUID_reference;
-- insert into DoctorUUID_reference (DoctorUUID, Doctor_ID) values
-- ('123', '1000000');

CREATE TABLE phone_numbers(
phone_numbersID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
Phone VARCHAR(150),
Phone_Priority INT, 
Address_ID INT unsigned NOT NULL,
FOREIGN KEY (Address_ID) REFERENCES Doctor_addresses(addresses_ID));

CREATE TABLE descriptions(
descriptionsID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
Description BLOB,
Doctor_ID INT unsigned NOT NULL, 
FOREIGN KEY (Doctor_ID) REFERENCES Doctor_credentials(DoctorID));

CREATE TABLE profile_update_history(
profile_update_historyID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
Updated_at VARCHAR(150), 
IP_Address INT unsigned,
Doctor_ID INT unsigned NOT NULL, 
FOREIGN KEY (Doctor_ID) REFERENCES Doctor_credentials(DoctorID));

CREATE TABLE login_history(
login_historyID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
Login_at VARCHAR(150), 
IP_Address INT unsigned,
Doctor_ID INT unsigned NOT NULL, 
FOREIGN KEY (Doctor_ID) REFERENCES Doctor_credentials(DoctorID));

CREATE TABLE service_and_category_list(
-- Lookup Table
service_and_category_listID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
Category_name VARCHAR(250),
Service_name VARCHAR(250));
drop table service_and_category_list;

CREATE TABLE service_mapping(
service_mapping_ID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
Service_time INT,
Service_price DECIMAL,
Service_and_Category_ID INT unsigned NOT NULL, 
FOREIGN KEY (Service_and_Category_ID) REFERENCES service_and_category_list(service_and_category_listID),
Doctor_ID INT unsigned NOT NULL, 
FOREIGN KEY (Doctor_ID) REFERENCES Doctor_credentials(DoctorID));

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

CREATE TABLE school_list(
-- Lookup Table
school_listID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
School_name VARCHAR(300));

CREATE TABLE major_list(
-- Lookup Table
major_listID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
Major_name VARCHAR(300));
select * from major_list;

CREATE TABLE education_type_list(
-- Lookup Table
education_typeID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
Education_type VARCHAR(150)); -- bachelor, resideny, fellow
select * from education_type_list;


CREATE TABLE education_mapping(
education_mapping_ID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
School_ID INT unsigned NOT NULL, 
FOREIGN KEY (School_ID) REFERENCES school_list(school_listID),
Major_ID INT unsigned NOT NULL, 
FOREIGN KEY (Major_ID) REFERENCES major_list(major_listID),
Education_type_ID INT unsigned NOT NULL, 
FOREIGN KEY (Education_type_ID) REFERENCES education_type_list(education_typeID), 
Start_Date DATE, 
End_Date DATE,
Doctor_ID INT unsigned NOT NULL, 
FOREIGN KEY (Doctor_ID) REFERENCES Doctor_credentials(DoctorID));

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

CREATE TABLE Doctor_addresses(
addresses_ID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
address_line_1 VARCHAR(200),
address_line_2 VARCHAR(200), -- apt, suite, etc.
city VARCHAR(150), 
state VARCHAR(150),
zip INT,
country VARCHAR(150),
address_priority INT,-- address number is the primary, secondary, etc. 
Doctor_ID INT unsigned NOT NULL, 
FOREIGN KEY (Doctor_ID) REFERENCES Doctor_credentials(DoctorID));

CREATE TABLE insurance_list(
-- Lookup Table
insurance_listID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
Insurance_name VARCHAR(200));

CREATE TABLE insurance_mapping(
insurance_mappingID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
Insurance_ID INT unsigned NOT NULL, 
FOREIGN KEY (Insurance_ID) REFERENCES insurance_list(insurance_listID),
Doctor_ID INT unsigned NOT NULL, 
FOREIGN KEY (Doctor_ID) REFERENCES Doctor_credentials(DoctorID));

CREATE TABLE booking_availability(
booking_availabilityID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
Day_of_week VARCHAR(150), -- wheather or not the doc takes on monday
Day_of_week_Start_Time VARCHAR(150),
Day_of_week_End_Time VARCHAR(150),	
Doctor_ID INT unsigned NOT NULL, 
FOREIGN KEY (Doctor_ID) REFERENCES Doctor_credentials(DoctorID));

CREATE TABLE detailed_booking_availability(
detailed_booking_availabilityID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
Hours_in_advance_scheduling VARCHAR(150),
Latest_Hours_before_booking VARCHAR(150),
Hours_in_advance_cancelation VARCHAR(150),
FOREIGN KEY (Doctor_ID) REFERENCES Doctor_credentials(DoctorID));


ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'password';

flush privileges;

ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'your_new_password';
