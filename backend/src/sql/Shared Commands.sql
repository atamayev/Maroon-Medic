USE MaroonDB;

CREATE TABLE credentials (
	user_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	email VARCHAR(150) NOT NULL,
	password VARCHAR(150) NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	user_type VARCHAR(20) NOT NULL, -- can be Doctor, Patient, admin, Administrator
	is_active BOOLEAN NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

SELECT * FROM credentials;

CREATE TABLE basic_user_info (
	basic_user_info_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	first_name VARCHAR(150) NOT NULL,
	last_name VARCHAR(150) NOT NULL,
	gender VARCHAR(150) NOT NULL,
	date_of_birth DATE NOT NULL,
	user_id INT UNSIGNED NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	FOREIGN KEY (user_id) REFERENCES credentials(user_id)
);

SELECT * FROM basic_user_info;

CREATE TABLE UUID_reference(
	UUID_reference_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	UUID VARCHAR(150) NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	user_id INT UNSIGNED NOT NULL,
	FOREIGN KEY (user_id) REFERENCES credentials(user_id)
);

SELECT * FROM UUID_reference;

CREATE TABLE language_mapping(
	language_mapping_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	language_id INT UNSIGNED NOT NULL,
	user_id INT UNSIGNED NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (language_id) REFERENCES language_list(language_list_id),
	FOREIGN KEY (user_id) REFERENCES credentials(user_id),
	UNIQUE (language_id, user_id)
);

SELECT * FROM language_mapping;

CREATE TABLE login_history(
	login_history_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	ip_address VARCHAR(15),
	user_id INT UNSIGNED NOT NULL,
	login_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (user_id) REFERENCES credentials(user_id)
);

SELECT * FROM login_history;

CREATE TABLE appointments(
	appointments_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	appointment_date DATETIME NOT NULL,
	appointment_price DECIMAL(5,2) NOT NULL CHECK(appointment_price >= 0),
	appointment_timespan INT UNSIGNED NOT NULL CHECK(appointment_timespan >= 0),
	patient_message VARCHAR(1000),
	doctor_confirmation_status ENUM('Pending', 'Approved', 'Denied'),
	service_and_category_list_id INT UNSIGNED NOT NULL,
	pet_info_id INT UNSIGNED NOT NULL,
	patient_id INT UNSIGNED NOT NULL,
	doctor_id INT UNSIGNED NOT NULL,
	addresses_id INT UNSIGNED NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	FOREIGN KEY (service_and_category_list_id) REFERENCES service_and_category_list(service_and_category_list_id),
	FOREIGN KEY (patient_id) REFERENCES Credentials(user_id),
	FOREIGN KEY (pet_info_id) REFERENCES pet_info(pet_info_id),
	FOREIGN KEY (doctor_id) REFERENCES Credentials(user_id),
	FOREIGN KEY (addresses_id) REFERENCES addresses(addresses_id),
	UNIQUE (appointment_date, service_and_category_list_id, pet_info_id, doctor_id)
);
SELECT * FROM appointments;

UPDATE Appointments set Doctor_confirmation_status = 0 where doctor_id;
