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

CREATE TABLE pet_procedures_mapping(
    pet_procedures_mapping_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    pet_procedures_id INT UNSIGNED NOT NULL,
    pet_info_id INT UNSIGNED NOT NULL,
	procedure_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (pet_procedures_id) REFERENCES pet_procedures_list(pet_procedures_list_id),
    FOREIGN KEY (pet_info_id) REFERENCES pet_info(pet_info_id),
    UNIQUE (pet_procedures_id, pet_info_id)
);

SELECT * FROM pet_procedures_mapping;

CREATE TABLE pet_medications_mapping(
    pet_medications_mapping_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    pet_medications_id INT UNSIGNED NOT NULL,
    pet_info_id INT UNSIGNED NOT NULL,
    frequency_period ENUM('day', 'week', 'month') NOT NULL,
    frequency_count ENUM("Once", "Twice", "Three Times", "Four Times", "Five Times") NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (pet_medications_id) REFERENCES pet_medications_list(pet_medications_list_id),
    FOREIGN KEY (pet_info_id) REFERENCES pet_info(pet_info_id),
    UNIQUE (pet_medications_id, pet_info_id)
);
drop table pet_medications_mapping;
SELECT * FROM pet_medications_mapping;
