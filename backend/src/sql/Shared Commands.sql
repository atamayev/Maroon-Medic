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
UPDATE appointments set doctor_confirmation_status = 0 where doctor_id;

CREATE TABLE reviews(
	review_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	appointment_id INT UNSIGNED NOT NULL,
	pet_info_id INT UNSIGNED NOT NULL,
	patient_id INT UNSIGNED NOT NULL,
	doctor_id INT UNSIGNED NOT NULL,
	patient_review_message VARCHAR(1000),
	patient_review_rating ENUM('1', '2', '3', '4', '5') NOT NULL,
	is_active BOOLEAN NOT NULL DEFAULT 1, -- set to 1 by default, when a patient deletes a review, set to 0.
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	FOREIGN KEY (appointment_id) REFERENCES appointments(appointments_id),
	FOREIGN KEY (pet_info_id) REFERENCES pet_info(pet_info_id),
	FOREIGN KEY (patient_id) REFERENCES Credentials(user_id),
	FOREIGN KEY (doctor_id) REFERENCES Credentials(user_id),
	UNIQUE (appointments_id)
);

SELECT * FROM reviews;

CREATE TABLE doctor_review_responses(
	doctor_review_response_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	review_id INT UNSIGNED NOT NULL,
	doctor_review_response VARCHAR(1000),
	is_active BOOLEAN NOT NULL DEFAULT 1,
	FOREIGN KEY (review_id) REFERENCES reviews(review_id)
);

SELECT * FROM doctor_review_responses;

CREATE TABLE review_reactions(
	review_reaction_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	review_id INT UNSIGNED NOT NULL,
	review_reaction BOOLEAN NOT NULL, -- thumbs up/down
	is_active BOOLEAN NOT NULL DEFAULT 1,
	FOREIGN KEY (review_id) REFERENCES reviews(review_id)
);

CREATE TABLE specialty_reviews(
	specialty_review_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	review_id INT UNSIGNED NOT NULL,
	specialty_review_category_id INT UNSIGNED NOT NULL,
	specialty_review_message VARCHAR(1000),
	review_rating ENUM('1', '2', '3', '4', '5') NOT NULL,
	is_active BOOLEAN NOT NULL DEFAULT 1,
	FOREIGN KEY (review_id) REFERENCES reviews(review_id),
	FOREIGN KEY (specialty_review_category_id) REFERENCES specialty_review_category_list(specialty_review_category_list_id)
);

SELECT * FROM specialty_reviews;
