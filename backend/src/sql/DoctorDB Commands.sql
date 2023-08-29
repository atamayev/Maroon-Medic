CREATE DATABASE MaroonDB;
USE MaroonDB;
SHOW TABLES;

CREATE TABLE credentials (
	user_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	email VARCHAR(150) NOT NULL,
	password VARCHAR(150) NOT NULL,
	created_at DATETIME NOT NULL,
	user_type VARCHAR(20) NOT NULL, -- can be Doctor, Patient, admin, Administrator
	is_active BOOLEAN NOT NULL DEFAULT 1
);

SELECT * FROM credentials;

CREATE TABLE doctor_specific_info(
	NVI INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	verified BOOLEAN NOT NULL,
	publicly_available BOOLEAN NOT NULL,
	doctor_id INT UNSIGNED NOT NULL,
	FOREIGN KEY (doctor_id) REFERENCES credentials(user_id)
)AUTO_INCREMENT = 1000000;

SELECT * FROM doctor_specific_info;

CREATE TABLE basic_user_info (
	basic_user_info_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	first_name VARCHAR(150) NOT NULL,
	last_name VARCHAR(150) NOT NULL,
	gender VARCHAR(150) NOT NULL,
	date_of_birth DATE NOT NULL,
	user_id INT UNSIGNED NOT NULL,
	FOREIGN KEY (user_id) REFERENCES credentials(user_id)
);

SELECT * FROM basic_user_info;

CREATE TABLE pet_list(
	pet_list_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	pet VARCHAR(30) NOT NULL,
	pet_type VARCHAR(30) NOT NULL
);

SELECT * FROM pet_list;

CREATE TABLE pet_mapping( -- which types of animals each vet services
	pet_mapping_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	pet_id INT UNSIGNED NOT NULL,
	doctor_id INT UNSIGNED NOT NULL,
	FOREIGN KEY (pet_id) REFERENCES pet_list(pet_list_id),
	FOREIGN KEY (doctor_id) REFERENCES credentials(user_id),
	UNIQUE (pet_id, doctor_id)
);

SELECT * FROM pet_mapping;

CREATE TABLE pet_info ( -- specific info about each pet (from the Patient POV)
	pet_info_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(150) NOT NULL,
	gender VARCHAR(150) NOT NULL,
	date_of_birth DATE NOT NULL,
	patient_id INT UNSIGNED NOT NULL,
	pet_id INT UNSIGNED NOT NULL,
	is_active BOOLEAN NOT NULL DEFAULT 1, -- set to 1 by default, when a patient deletes pet, set to 0.
	FOREIGN KEY (patient_id) REFERENCES credentials(user_id),
	FOREIGN KEY (pet_id) REFERENCES pet_list(pet_list_id)
);

SELECT * FROM pet_info;

CREATE TABLE UUID_reference(
	UUID_reference_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	UUID VARCHAR(150) NOT NULL,
	created_at DATETIME NOT NULL,
	user_id INT UNSIGNED NOT NULL,
	FOREIGN KEY (user_id) REFERENCES credentials(user_id)
);

SELECT * FROM UUID_reference;

CREATE TABLE descriptions(
	descriptions_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	description VARCHAR(2500),
	doctor_id INT UNSIGNED NOT NULL,
	FOREIGN KEY (doctor_id) REFERENCES credentials(user_id)
);

SELECT * FROM descriptions;

CREATE TABLE insurance_list(
	insurance_list_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	insurance_name VARCHAR(200) NOT NULL
);

SELECT * FROM insurance_list;

CREATE TABLE insurance_mapping(
	insurance_mapping_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	insurance_id INT UNSIGNED NOT NULL,
	pet_info_id INT UNSIGNED NOT NULL,
	FOREIGN KEY (insurance_id) REFERENCES insurance_list(insurance_list_id),
	FOREIGN KEY (pet_info_id) REFERENCES pet_info(pet_info_id),
	UNIQUE (insurance_id, pet_info_id)
);

SELECT * FROM insurance_mapping;

CREATE TABLE service_and_category_list(
	service_and_category_list_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	category_name VARCHAR(250) NOT NULL,
	service_name VARCHAR(250) NOT NULL
);

SELECT * FROM service_and_category_list;

CREATE TABLE service_mapping(
	service_mapping_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	service_time VARCHAR(20) NOT NULL,
	service_price DECIMAL(5,2) NOT NULL CHECK(Service_price >= 0),
	service_and_category_id INT UNSIGNED NOT NULL,
	doctor_id INT UNSIGNED NOT NULL,
	FOREIGN KEY (service_and_category_id) REFERENCES service_and_category_list(service_and_category_list_id),
	FOREIGN KEY (doctor_id) REFERENCES credentials(user_id),
	UNIQUE (service_time, service_and_category_id, doctor_id)
);

SELECT * FROM service_mapping;

CREATE TABLE pictures(
	pictures_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	picture_link VARCHAR(512),
	picture_number INT, -- picture number is the primary, secondary, etc.
	doctor_id INT UNSIGNED NOT NULL,
	FOREIGN KEY (doctor_id) REFERENCES credentials(user_id)
);

SELECT * FROM pictures;

CREATE TABLE language_list(
	language_list_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	language_name VARCHAR(150) NOT NULL
);

SELECT * FROM language_list;

CREATE TABLE language_mapping(
	language_mapping_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	language_id INT UNSIGNED NOT NULL,
	user_id INT UNSIGNED NOT NULL,
	FOREIGN KEY (language_id) REFERENCES language_list(language_list_id),
	FOREIGN KEY (user_id) REFERENCES credentials(user_id),
	UNIQUE (language_id, user_id)
);

SELECT * FROM language_mapping;

CREATE TABLE pre_vet_school_list(
	pre_vet_school_list_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	school_name VARCHAR(300) NOT NULL
);

SELECT * FROM pre_vet_school_list;

CREATE TABLE major_list(
	major_list_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	major_name VARCHAR(300) NOT NULL
);

SELECT * FROM major_list;

CREATE TABLE pre_vet_education_type_list(
	pre_vet_education_type_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	education_type VARCHAR(150) NOT NULL
);

SELECT * FROM pre_vet_education_type_list;

CREATE TABLE pre_vet_education_mapping(
	pre_vet_education_mapping_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	school_id INT UNSIGNED NOT NULL,
	major_id INT UNSIGNED NOT NULL,
	education_type_id INT UNSIGNED NOT NULL,
	start_date DATE NOT NULL,
	end_date DATE NOT NULL,
	doctor_id INT UNSIGNED NOT NULL,
	FOREIGN KEY (school_id) REFERENCES pre_vet_school_list(pre_vet_school_list_id),
	FOREIGN KEY (major_id) REFERENCES major_list(major_list_id),
	FOREIGN KEY (education_type_id) REFERENCES pre_vet_education_type_list(pre_vet_education_type_id),
	FOREIGN KEY (doctor_id) REFERENCES credentials(user_id),
	UNIQUE (school_id, major_id, education_type_id, doctor_id)
);

SELECT * FROM pre_vet_education_mapping;

CREATE TABLE vet_school_list(
	vet_school_list_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	school_name VARCHAR(300) NOT NULL
);

SELECT * FROM vet_school_list;

CREATE TABLE vet_education_type_list(
	vet_education_type_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	education_type VARCHAR(150) NOT NULL
);

SELECT * FROM vet_education_type_list;

CREATE TABLE vet_education_mapping(
	vet_education_mapping_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	school_id INT UNSIGNED NOT NULL,
	education_type_id INT UNSIGNED NOT NULL,
	start_date DATE NOT NULL,
	end_date DATE NOT NULL,
	doctor_id INT UNSIGNED NOT NULL,
	FOREIGN KEY (school_id) REFERENCES vet_school_list(vet_school_list_id),
	FOREIGN KEY (education_type_id) REFERENCES vet_education_type_list(vet_education_type_id),
	FOREIGN KEY (doctor_id) REFERENCES credentials(user_id),
	UNIQUE (school_id, education_type_id, doctor_id)
);

SELECT * FROM vet_education_mapping;

CREATE TABLE specialties_list(
	specialties_list_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	organization_name VARCHAR(300) NOT NULL,
	specialty_name VARCHAR(300) NOT NULL
);

SELECT * FROM specialties_list;

CREATE TABLE specialty_mapping(
	specialty_mapping_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	specialty_id INT UNSIGNED NOT NULL,
	doctor_id INT UNSIGNED NOT NULL,
	FOREIGN KEY (specialty_id) REFERENCES specialties_list(specialties_list_id),
	FOREIGN KEY (doctor_id) REFERENCES credentials(user_id),
	UNIQUE (specialty_id, doctor_id)
);

SELECT * FROM specialty_mapping;

CREATE TABLE addresses(
	addresses_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
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
	doctor_id INT UNSIGNED NOT NULL,
	FOREIGN KEY (doctor_id) REFERENCES credentials(user_id)
);

select * from addresses;
select * from addresses where isactive;
SELECT * FROM addresses inner join phone on addresses.addresses_id = phone.address_id WHERE addresses.isactive;
-- update addresses set is_active = 0 where doctor_id;

CREATE TABLE doctor_phone_numbers(
	phone_numbers_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	phone VARCHAR(150),
	phone_type varchar(20), -- cell, office, fax
	address_id INT UNSIGNED NOT NULL,
	FOREIGN KEY (address_id) REFERENCES addresses(addresses_id)
);

SELECT * FROM doctor_phone_numbers;

CREATE TABLE booking_availability(
	booking_availability_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	day_of_week VARCHAR(10),
	start_time VARCHAR(10),
	end_time VARCHAR(10),
	address_id INT UNSIGNED NOT NULL,
	FOREIGN KEY (address_id) REFERENCES addresses(addresses_id)
);

SELECT * FROM booking_availability JOIN addresses ON booking_availability.address_id = addresses.addresses_id where addresses.is_active;
SELECT * FROM booking_availability;

CREATE TABLE login_history(
login_history_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
login_at DATETIME NOT NULL,
ip_address VARCHAR(15),
user_id INT UNSIGNED NOT NULL,
FOREIGN KEY (user_id) REFERENCES credentials(user_id));

SELECT * FROM login_history;

-- CREATE TABLE detailed_booking_availability(
-- 	detailed_booking_availability_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
-- 	Hours_in_advance_scheduling VARCHAR(10),
-- 	Latest_Hours_before_booking VARCHAR(10),
-- 	Hours_in_advance_cancelation VARCHAR(10),
-- 	Appointment_time_slots VARCHAR(10),
-- 	doctor_id INT UNSIGNED NOT NULL,
-- 	FOREIGN KEY (doctor_id) REFERENCES credentials(user_id)
-- );

-- SELECT * FROM detailed_booking_availability;

-- CREATE TABLE profile_update_history(
-- profile_update_history_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
-- Updated_at VARCHAR(150),
-- ip_address INT UNSIGNED,
-- user_id INT UNSIGNED NOT NULL,
-- FOREIGN KEY (doctor_id) REFERENCES credentials(user_id));
