create database DoctorDB;
use DoctorDB;
show tables;

SELECT education_mapping.Doctor_ID, school_list.School_name, major_list.Major_name, education_type_list.Education_type, education_mapping.Start_Date, education_mapping.End_Date 
FROM education_mapping, school_list, major_list, education_type_list 
WHERE education_mapping.School_ID = school_list.school_listID 
AND education_mapping.Major_ID = major_list.major_listID 
AND education_mapping.Education_type_ID = education_type_list.education_typeID 
AND education_mapping.Doctor_ID = '100000';

SELECT * FROM specialties_list;
SELECT insurance_mapping.Doctor_ID, insurance_list.Insurance_name FROM insurance_list JOIN insurance_mapping ON insurance_list.insurance_listID = insurance_mapping.Insurance_ID WHERE insurance_mapping.Doctor_ID = '1000000';

SELECT specialties_list.Organization_name, specialties_list.Specialty_name  FROM specialties_list JOIN specialty_mapping ON specialties_list.specialties_listID = specialty_mapping.specialty_mappingID WHERE specialty_mapping.Doctor_ID = '1000000';

CREATE TABLE Doctor_credentials (
  DoctorID  INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY, # NVI
  email VARCHAR(150) NOT NULL,
  password VARCHAR(150) NOT NULL,
  Created_at VARCHAR(150) NOT NULL, 
  verified BOOLEAN NOT NULL, 
  publiclyAvailable BOOLEAN NOT NULL) AUTO_INCREMENT=1000000;

select * from Doctor_credentials;
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
-- SELECT FirstName, LastName, Doctor_ID FROM Doctor_credentials left JOIN basic_Doctor_info ON Doctor_credentials.DoctorID = basic_Doctor_info.Doctor_ID where email = 'abc@123.com5';
SELECT FirstName, LastName, Doctor_ID FROM Doctor_credentials left JOIN basic_Doctor_info ON Doctor_credentials.DoctorID = basic_Doctor_info.Doctor_ID WHERE verified = TRUE AND publiclyAvailable=TRUE;

-- WHERE Doctor_credentials.DoctorID = 1000000;

CREATE TABLE DoctorUUID_reference(
DoctorUUID_referenceID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
DoctorUUID VARCHAR(150) NOT NULL, 
Created_at VARCHAR(150) NOT NULL,
Doctor_ID INT unsigned NOT NULL, 
FOREIGN KEY (Doctor_ID) REFERENCES Doctor_credentials(DoctorID)
);

select * from DoctorUUID_reference;
-- insert into DoctorUUID_reference (DoctorUUID, Doctor_ID) values
-- ('123', '1000000');

CREATE TABLE descriptions(
descriptionsID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
Description VARCHAR(2500),
Doctor_ID INT unsigned NOT NULL, 
FOREIGN KEY (Doctor_ID) REFERENCES Doctor_credentials(DoctorID));
select * from descriptions;
SELECT * FROM specialties_list;

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
SELECT * FROM service_and_category_list;

CREATE TABLE service_mapping(
service_mapping_ID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
Service_time VARCHAR(10) NOT NULL,
Service_price VARCHAR(10),
Service_and_Category_ID INT unsigned NOT NULL, 
FOREIGN KEY (Service_and_Category_ID) REFERENCES service_and_category_list(service_and_category_listID),
Doctor_ID INT unsigned NOT NULL, 
FOREIGN KEY (Doctor_ID) REFERENCES Doctor_credentials(DoctorID));
Select * from service_mapping;
delete from service_mapping where Doctor_ID = '1000125';
SELECT 
  service_and_category_list.Category_name, 
  service_and_category_list.Service_name, 
  service_mapping.service_mapping_ID, 
  service_mapping.Service_time, 
  service_mapping.Service_price,
  service_mapping.Service_and_Category_ID
FROM 
  service_and_category_list 
JOIN 
  service_mapping 
ON 
  service_and_category_list.service_and_category_listID = service_mapping.Service_and_Category_ID 
WHERE 
  service_mapping.Doctor_ID = '1000125';

    -- Important key constraint:
	ALTER TABLE service_mapping
	ADD CONSTRAINT service_mapping_constraint
	UNIQUE (Service_price, Service_and_Category_ID, Doctor_ID);
    
delete from service_mapping where Doctor_ID = '1000125';
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
SELECT * FROM language_mapping JOIN language_list ON language_listID = language_mapping.Language_ID;
SELECT
	bdi.Doctor_ID, bdi.FirstName, bdi.LastName,ll.language_name
    FROM basic_Doctor_info bdi
    JOIN language_mapping lm ON bdi.Doctor_ID = lm.Doctor_ID
    JOIN language_list ll ON lm.language_mappingID = ll.language_listID
    WHERE bdi.Doctor_ID = '1000000';

-- DELETE FROM language_mapping where Doctor_ID = '1000000';
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

select * from pre_vet_school_list;

CREATE TABLE major_list(
-- Lookup Table
major_listID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
Major_name VARCHAR(300));
select * from major_list;

CREATE TABLE pre_vet_education_type_list(
-- Lookup Table
pre_vet_education_typeID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
Education_type VARCHAR(150));
select * from pre_vet_education_type_list;

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
select * from pre_vet_education_mapping;
	ALTER TABLE pre_vet_education_mapping
	ADD CONSTRAINT pre_vet_education_mapping_constraint
	UNIQUE (School_ID, Major_ID, Education_type_ID, Doctor_ID);

CREATE TABLE vet_school_list(
-- Lookup Table
vet_school_listID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
School_name VARCHAR(300));
select * from vet_school_list;

CREATE TABLE vet_education_type_list(
-- Lookup Table
vet_education_typeID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
Education_type VARCHAR(150));
select * from vet_education_type_list;

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
select * from vet_education_mapping;
	ALTER TABLE vet_education_mapping
	ADD CONSTRAINT vet_education_mapping_constraint
	UNIQUE (School_ID, Education_type_ID, Doctor_ID);

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

SELECT * FROM specialty_mapping;

	ALTER TABLE specialty_mapping
	ADD CONSTRAINT specialty_mapping_constraint
	UNIQUE (Specialty_ID, Doctor_ID);

CREATE TABLE phone_numbers(
phone_numbersID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
phone VARCHAR(150),
phone_priority INT, 
address_ID INT unsigned NOT NULL,
FOREIGN KEY (address_ID) REFERENCES Doctor_addresses(addresses_ID) ON DELETE CASCADE
);

select * from phone_numbers;
delete from phone_numbers where phone_numbersID between '1' and '1000';

CREATE TABLE doctor_addresses(
addresses_ID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
address_title VARCHAR(200) NOT NULL,
address_line_1 VARCHAR(200) NOT NULL,
address_line_2 VARCHAR(200), -- apt, suite, etc.
city VARCHAR(150) NOT NULL, 
state VARCHAR(150) NOT NULL,
zip VARCHAR(10) NOT NULL,
country VARCHAR(150) NOT NULL,
address_priority INT,-- address number is the primary, secondary, etc. 
Doctor_ID INT unsigned NOT NULL, 
FOREIGN KEY (Doctor_ID) REFERENCES Doctor_credentials(DoctorID));
SELECT * FROM doctor_addresses;
SELECT * FROM  doctor_addresses JOIN phone_numbers ON  doctor_addresses.addresses_ID = phone_numbers.Address_ID WHERE  doctor_addresses.Doctor_ID = '1000125';
DELETE FROM doctor_addresses WHERE Doctor_ID = '1000125' ;


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

    -- Important key constraint:
	ALTER TABLE insurance_mapping
	ADD CONSTRAINT insurance_mapping_constraint
	UNIQUE (Insurance_ID, Doctor_ID);
    
SELECT * FROM insurance_mapping;

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
