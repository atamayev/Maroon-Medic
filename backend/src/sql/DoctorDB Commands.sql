CREATE DATABASE MaroonDB;
USE MaroonDB;
SHOW TABLES;

CREATE TABLE credentials (
	UserID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
	email VARCHAR(150) NOT NULL,
	password VARCHAR(150) NOT NULL,
	created_at DATETIME NOT NULL,
	user_type VARCHAR(20) NOT NULL, -- can be Doctor, Patient, admin, Administrator
	is_active BOOLEAN NOT NULL DEFAULT 1
);

SELECT * FROM credentials;

CREATE TABLE doctor_specific_info(
	NVI INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
	verified BOOLEAN NOT NULL,
	publicly_available BOOLEAN NOT NULL,
	Doctor_ID INT unsigned NOT NULL,
	FOREIGN KEY (Doctor_ID) REFERENCES Credentials(UserID)
)AUTO_INCREMENT = 1000000;

SELECT * FROM doctor_specific_info;

CREATE TABLE basic_user_info (
	basic_user_infoID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
	first_name VARCHAR(150) NOT NULL,
	last_name VARCHAR(150) NOT NULL,
	gender VARCHAR(150) NOT NULL,
	date_of_birth DATE NOT NULL,
	User_ID INT unsigned NOT NULL,
	FOREIGN KEY (User_ID) REFERENCES Credentials(UserID)
);

SELECT * FROM basic_user_info;

CREATE TABLE pet_list(
	pet_listID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
	pet VARCHAR(30) NOT NULL,
	pet_type VARCHAR(30) NOT NULL
);

SELECT * FROM pet_list;

CREATE TABLE pet_mapping( -- which types of animals each vet services
	pet_mappingID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
	pet_ID INT unsigned NOT NULL,
	Doctor_ID INT unsigned NOT NULL,
	FOREIGN KEY (pet_ID) REFERENCES pet_list(pet_listID),
	FOREIGN KEY (Doctor_ID) REFERENCES Credentials(UserID),
	UNIQUE (pet_ID, Doctor_ID)
);

SELECT * FROM pet_mapping;

CREATE TABLE pet_info ( -- specific info about each pet (from the Patient POV)
	pet_infoID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(150) NOT NULL,
	gender VARCHAR(150) NOT NULL,
	date_of_birth DATE NOT NULL,
	Patient_ID INT unsigned NOT NULL,
	pet_ID INT unsigned NOT NULL,
	is_active BOOLEAN NOT NULL DEFAULT 1, -- set to 1 by default, when a patient deletes pet, set to 0.
	FOREIGN KEY (Patient_ID) REFERENCES Credentials(UserID),
	FOREIGN KEY (pet_ID) REFERENCES pet_list(pet_listID)
);

SELECT * FROM pet_info;

CREATE TABLE UUID_reference(
	UUID_referenceID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
	UUID VARCHAR(150) NOT NULL,
	created_at DATETIME NOT NULL,
	User_ID INT unsigned NOT NULL,
	FOREIGN KEY (User_ID) REFERENCES Credentials(UserID)
);

SELECT * FROM UUID_reference;

CREATE TABLE descriptions(
	descriptionsID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
	description VARCHAR(2500),
	Doctor_ID INT unsigned NOT NULL,
	FOREIGN KEY (Doctor_ID) REFERENCES Credentials(UserID)
);

SELECT * FROM descriptions;

CREATE TABLE insurance_list(
	insurance_listID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
	insurance_name VARCHAR(200)
);

SELECT * FROM insurance_list;

CREATE TABLE insurance_mapping(
	insurance_mappingID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
	Insurance_ID INT unsigned NOT NULL,
	pet_info_ID INT unsigned NOT NULL,
	FOREIGN KEY (Insurance_ID) REFERENCES insurance_list(insurance_listID),
	FOREIGN KEY (pet_info_ID) REFERENCES pet_info(pet_infoID),
	UNIQUE (Insurance_ID, pet_info_ID)
);

SELECT * FROM insurance_mapping;

CREATE TABLE service_and_category_list(
	service_and_category_listID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
	category_name VARCHAR(250),
	service_name VARCHAR(250)
);

SELECT * FROM service_and_category_list;

CREATE TABLE service_mapping(
	service_mappingID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
	service_time VARCHAR(20) NOT NULL,
	service_price DECIMAL(5,2) NOT NULL CHECK(Service_price >= 0),
	Service_and_Category_ID INT unsigned NOT NULL,
	Doctor_ID INT unsigned NOT NULL,
	FOREIGN KEY (Service_and_Category_ID) REFERENCES service_and_category_list(service_and_category_listID),
	FOREIGN KEY (Doctor_ID) REFERENCES Credentials(UserID),
	UNIQUE (service_time, Service_and_Category_ID, Doctor_ID)
);

SELECT * FROM service_mapping;

CREATE TABLE pictures(
	picturesID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
	picture_link VARCHAR(512),
	picture_number INT, -- picture number is the primary, secondary, etc.
	Doctor_ID INT unsigned NOT NULL,
	FOREIGN KEY (Doctor_ID) REFERENCES Credentials(UserID)
);

CREATE TABLE language_list(
	language_listID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
	language_name VARCHAR(150)
);

SELECT * FROM language_list;

CREATE TABLE language_mapping(
	language_mappingID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
	Language_ID INT unsigned NOT NULL,
	User_ID INT unsigned NOT NULL,
	FOREIGN KEY (Language_ID) REFERENCES language_list(language_listID),
	FOREIGN KEY (User_ID) REFERENCES Credentials(UserID),
	UNIQUE (Language_ID, User_ID)
);

SELECT * FROM language_mapping;

CREATE TABLE pre_vet_school_list(
	pre_vet_school_listID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
	school_name VARCHAR(300)
);

SELECT * FROM pre_vet_school_list;

CREATE TABLE major_list(
	major_listID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
	major_name VARCHAR(300)
);

SELECT * FROM major_list;

CREATE TABLE pre_vet_education_type_list(
	pre_vet_education_typeID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
	education_type VARCHAR(150)
);

SELECT * FROM pre_vet_education_type_list;

CREATE TABLE pre_vet_education_mapping(
	pre_vet_education_mappingID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
	School_ID INT unsigned NOT NULL,
	Major_ID INT unsigned NOT NULL,
	Education_type_ID INT unsigned NOT NULL,
	Start_Date DATE NOT NULL,
	End_Date DATE NOT NULL,
	Doctor_ID INT unsigned NOT NULL,
	FOREIGN KEY (School_ID) REFERENCES pre_vet_school_list(pre_vet_school_listID),
	FOREIGN KEY (Major_ID) REFERENCES major_list(major_listID),
	FOREIGN KEY (Education_type_ID) REFERENCES pre_vet_education_type_list(pre_vet_education_typeID),
	FOREIGN KEY (Doctor_ID) REFERENCES Credentials(UserID),
	UNIQUE (School_ID, Major_ID, Education_type_ID, Doctor_ID)
);

SELECT * FROM pre_vet_education_mapping;

CREATE TABLE vet_school_list(
	vet_school_listID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
	school_name VARCHAR(300)
);

SELECT * FROM vet_school_list;

CREATE TABLE vet_education_type_list(
	vet_education_typeID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
	Education_type VARCHAR(150)
);

SELECT * FROM vet_education_type_list;

CREATE TABLE vet_education_mapping(
	vet_education_mappingID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
	School_ID INT unsigned NOT NULL,
	Education_type_ID INT unsigned NOT NULL,
	Start_Date DATE NOT NULL,
	End_Date DATE NOT NULL,
	Doctor_ID INT unsigned NOT NULL,
	FOREIGN KEY (School_ID) REFERENCES vet_school_list(vet_school_listID),
	FOREIGN KEY (Education_type_ID) REFERENCES vet_education_type_list(vet_education_typeID),
	FOREIGN KEY (Doctor_ID) REFERENCES Credentials(UserID),
	UNIQUE (School_ID, Education_type_ID, Doctor_ID)
);

SELECT * FROM vet_education_mapping;

CREATE TABLE specialties_list(
	specialties_listID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
	organization_name VARCHAR(300),
	specialty_name VARCHAR(300)
);

SELECT * FROM specialties_list;

CREATE TABLE specialty_mapping(
	specialty_mappingID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
	Specialty_ID INT unsigned NOT NULL,
	Doctor_ID INT unsigned NOT NULL,
	FOREIGN KEY (Specialty_ID) REFERENCES specialties_list(specialties_listID),
	FOREIGN KEY (Doctor_ID) REFERENCES Credentials(UserID),
	UNIQUE (Specialty_ID, Doctor_ID)
);

SELECT * FROM specialty_mapping;

CREATE TABLE addresses(
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
	instant_book BOOLEAN NOT NULL,
	is_active BOOLEAN NOT NULL DEFAULT 1, -- set to 1 by default, when a doc deletes address, set to 0.
	Doctor_ID INT unsigned NOT NULL,
	FOREIGN KEY (Doctor_ID) REFERENCES Credentials(UserID)
);

select * from addresses;
select * from addresses where isactive;
SELECT * FROM addresses inner join phone on addresses.addressesID = phone.address_ID WHERE addresses.isactive;
-- update addresses set is_active = 0 where Doctor_ID;

CREATE TABLE doctor_phone_numbers(
	phone_numbersID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
	phone VARCHAR(150),
	phone_type varchar(20), -- cell, office, fax
	address_ID INT unsigned NOT NULL,
	FOREIGN KEY (address_ID) REFERENCES addresses(addressesID)
);

SELECT * FROM doctor_phone_numbers;

CREATE TABLE booking_availability(
	booking_availabilityID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
	day_of_week VARCHAR(10),
	start_time VARCHAR(10),
	end_time VARCHAR(10),
	address_ID INT unsigned NOT NULL,
	FOREIGN KEY (address_ID) REFERENCES addresses(addressesID)
);

SELECT * FROM booking_availability JOIN addresses ON booking_availability.address_ID = addresses.addressesID where addresses.is_active;
SELECT * FROM booking_availability;

CREATE TABLE login_history(
login_historyID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
Login_at DATETIME NOT NULL,
IP_Address VARCHAR(15),
User_ID INT unsigned NOT NULL,
FOREIGN KEY (User_ID) REFERENCES Credentials(UserID));

SELECT * FROM login_history;

-- CREATE TABLE detailed_booking_availability(
-- 	detailed_booking_availabilityID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
-- 	Hours_in_advance_scheduling VARCHAR(10),
-- 	Latest_Hours_before_booking VARCHAR(10),
-- 	Hours_in_advance_cancelation VARCHAR(10),
-- 	Appointment_time_slots VARCHAR(10),
-- 	Doctor_ID INT unsigned NOT NULL,
-- 	FOREIGN KEY (Doctor_ID) REFERENCES Credentials(UserID)
-- );

-- SELECT * FROM detailed_booking_availability;

-- CREATE TABLE profile_update_history(
-- profile_update_historyID INT unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
-- Updated_at VARCHAR(150),
-- IP_Address INT unsigned,
-- User_ID INT unsigned NOT NULL,
-- FOREIGN KEY (Doctor_ID) REFERENCES Credentials(UserID));
