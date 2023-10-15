USE MaroonDB;

CREATE TABLE pet_info ( -- specific info about each pet (from the Patient POV)
	pet_info_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(150) NOT NULL,
	gender VARCHAR(150) NOT NULL,
	date_of_birth DATE NOT NULL,
	patient_id INT UNSIGNED NOT NULL,
	pet_id INT UNSIGNED NOT NULL,
	is_active BOOLEAN NOT NULL DEFAULT 1, -- set to 1 by default, when a patient deletes pet, set to 0.
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	FOREIGN KEY (patient_id) REFERENCES credentials(user_id),
	FOREIGN KEY (pet_id) REFERENCES pet_list(pet_list_id)
);

SELECT * FROM pet_info;

CREATE TABLE insurance_mapping(
	insurance_mapping_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	insurance_id INT UNSIGNED NOT NULL,
	pet_info_id INT UNSIGNED NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (insurance_id) REFERENCES insurance_list(insurance_list_id),
	FOREIGN KEY (pet_info_id) REFERENCES pet_info(pet_info_id),
	UNIQUE (insurance_id, pet_info_id)
);

SELECT * FROM insurance_mapping;

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

CREATE TABLE pet_medication_mapping(
    pet_medication_mapping_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    pet_medication_id INT UNSIGNED NOT NULL,
    pet_info_id INT UNSIGNED NOT NULL,
    frequency_period ENUM('day', 'week', 'month') NOT NULL,
    frequency_count ENUM("Once", "Twice", "Three Times", "Four Times", "Five Times") NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (pet_medication_id) REFERENCES pet_medication_list(pet_medication_list_id),
    FOREIGN KEY (pet_info_id) REFERENCES pet_info(pet_info_id),
    UNIQUE (pet_medication_id, pet_info_id)
);

SELECT * FROM pet_medication_mapping;
