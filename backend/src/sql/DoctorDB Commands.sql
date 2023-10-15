CREATE DATABASE MaroonDB;
USE MaroonDB;
SHOW TABLES;

CREATE TABLE doctor_specific_info(
	NVI INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	verified BOOLEAN NOT NULL,
	publicly_available BOOLEAN NOT NULL,
	doctor_id INT UNSIGNED NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	FOREIGN KEY (doctor_id) REFERENCES credentials(user_id)
)AUTO_INCREMENT = 1000000;

SELECT * FROM doctor_specific_info;

CREATE TABLE pet_mapping( -- which types of animals each vet services
	pet_mapping_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	pet_id INT UNSIGNED NOT NULL,
	doctor_id INT UNSIGNED NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (pet_id) REFERENCES pet_list(pet_list_id),
	FOREIGN KEY (doctor_id) REFERENCES credentials(user_id),
	UNIQUE (pet_id, doctor_id)
);

SELECT * FROM pet_mapping;

CREATE TABLE descriptions(
	descriptions_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	description VARCHAR(2500),
	doctor_id INT UNSIGNED NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	FOREIGN KEY (doctor_id) REFERENCES credentials(user_id)
);

SELECT * FROM descriptions;

CREATE TABLE service_mapping(
	service_mapping_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	service_time VARCHAR(20) NOT NULL,
	service_price DECIMAL(5,2) NOT NULL CHECK(Service_price >= 0),
	service_and_category_id INT UNSIGNED NOT NULL,
	doctor_id INT UNSIGNED NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	FOREIGN KEY (service_and_category_id) REFERENCES service_and_category_list(service_and_category_list_id),
	FOREIGN KEY (doctor_id) REFERENCES credentials(user_id),
	UNIQUE (service_time, service_and_category_id, doctor_id)
);

SELECT * FROM service_mapping;

CREATE TABLE pre_vet_education_mapping(
	pre_vet_education_mapping_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	school_id INT UNSIGNED NOT NULL,
	major_id INT UNSIGNED NOT NULL,
	education_type_id INT UNSIGNED NOT NULL,
	start_date DATE NOT NULL,
	end_date DATE NOT NULL,
	doctor_id INT UNSIGNED NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	FOREIGN KEY (school_id) REFERENCES pre_vet_school_list(pre_vet_school_list_id),
	FOREIGN KEY (major_id) REFERENCES major_list(major_list_id),
	FOREIGN KEY (education_type_id) REFERENCES pre_vet_education_type_list(pre_vet_education_type_id),
	FOREIGN KEY (doctor_id) REFERENCES credentials(user_id),
	UNIQUE (school_id, major_id, education_type_id, doctor_id)
);

SELECT * FROM pre_vet_education_mapping;

CREATE TABLE vet_education_mapping(
	vet_education_mapping_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	school_id INT UNSIGNED NOT NULL,
	education_type_id INT UNSIGNED NOT NULL,
	start_date DATE NOT NULL,
	end_date DATE NOT NULL,
	doctor_id INT UNSIGNED NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	FOREIGN KEY (school_id) REFERENCES vet_school_list(vet_school_list_id),
	FOREIGN KEY (education_type_id) REFERENCES vet_education_type_list(vet_education_type_id),
	FOREIGN KEY (doctor_id) REFERENCES credentials(user_id),
	UNIQUE (school_id, education_type_id, doctor_id)
);

SELECT * FROM vet_education_mapping;

CREATE TABLE specialty_mapping(
	specialty_mapping_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	specialty_id INT UNSIGNED NOT NULL,
	doctor_id INT UNSIGNED NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (specialty_id) REFERENCES specialty_list(specialty_list_id),
	FOREIGN KEY (doctor_id) REFERENCES credentials(user_id),
	UNIQUE (specialty_id, doctor_id)
);

SELECT * FROM specialty_mapping;

CREATE TABLE pet_medication_list(
	pet_medication_list_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	medication_name VARCHAR(300) NOT NULL
);

SELECT * FROM pet_medication_list;

CREATE TABLE pet_medication_mapping(
    pet_medication_mapping_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    pet_medication_id INT UNSIGNED NOT NULL,
    pet_info_id INT UNSIGNED NOT NULL,
    frequency_period ENUM('day', 'week', 'month') NOT NULL,
    frequency_count INT UNSIGNED NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (pet_medication_id) REFERENCES pet_medication_list(pet_medication_list_id),
    FOREIGN KEY (pet_info_id) REFERENCES pet_info(pet_info_id),
    UNIQUE (pet_medication_id, pet_info_id)
);

SELECT * FROM pet_medication_mapping;

CREATE TABLE pet_procedure_list(
	pet_procedure_list_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	procedure_name VARCHAR(300) NOT NULL
);

SELECT * FROM pet_procedure_list;

CREATE TABLE pet_procedure_mapping(
    pet_procedure_mapping_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    pet_procedure_id INT UNSIGNED NOT NULL,
    pet_info_id INT UNSIGNED NOT NULL,
	procedure_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (pet_procedure_id) REFERENCES pet_procedure_list(pet_procedure_list_id),
    FOREIGN KEY (pet_info_id) REFERENCES pet_info(pet_info_id),
    UNIQUE (pet_procedure_id, pet_info_id)
);

SELECT * FROM pet_procedure_mapping;

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
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	FOREIGN KEY (doctor_id) REFERENCES credentials(user_id)
);

select * from addresses;
select * from addresses where is_active;
SELECT * FROM addresses inner join doctor_phone_numbers on addresses.addresses_id = doctor_phone_numbers.address_id WHERE addresses.is_active;
-- update addresses set is_active = 0 where doctor_id;

CREATE TABLE doctor_phone_numbers(
	phone_numbers_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	phone VARCHAR(150),
	phone_type VARCHAR(20), -- cell, office, fax
	address_id INT UNSIGNED NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	FOREIGN KEY (address_id) REFERENCES addresses(addresses_id)
);

SELECT * FROM doctor_phone_numbers;

CREATE TABLE booking_availability(
	booking_availability_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	day_of_week VARCHAR(10),
	start_time VARCHAR(10),
	end_time VARCHAR(10),
	address_id INT UNSIGNED NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	FOREIGN KEY (address_id) REFERENCES addresses(addresses_id)
);

SELECT * FROM booking_availability JOIN addresses ON booking_availability.address_id = addresses.addresses_id where addresses.is_active;
SELECT * FROM booking_availability;

-- CREATE TABLE pictures(
-- 	pictures_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
-- 	picture_link VARCHAR(512),
-- 	picture_number INT, -- picture number is the primary, secondary, etc.
-- 	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
-- 	doctor_id INT UNSIGNED NOT NULL,
-- 	FOREIGN KEY (doctor_id) REFERENCES credentials(user_id)
-- );

-- SELECT * FROM pictures;

-- CREATE TABLE detailed_booking_availability(
-- 	detailed_booking_availability_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
-- 	Hours_in_advance_scheduling VARCHAR(10),
-- 	Latest_Hours_before_booking VARCHAR(10),
-- 	Hours_in_advance_cancelation VARCHAR(10),
-- 	Appointment_time_slots VARCHAR(10),
-- 	doctor_id INT UNSIGNED NOT NULL,
--  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
-- 	FOREIGN KEY (doctor_id) REFERENCES credentials(user_id)
-- );
-- SELECT * FROM detailed_booking_availability;
