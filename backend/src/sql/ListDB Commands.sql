USE MaroonDB;

CREATE TABLE pet_list(
	pet_list_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	pet VARCHAR(30) NOT NULL,
	pet_type VARCHAR(30) NOT NULL
);

SELECT * FROM pet_list;

CREATE TABLE insurance_list(
	insurance_list_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	insurance_name VARCHAR(200) NOT NULL
);

SELECT * FROM insurance_list;

CREATE TABLE service_and_category_list(
	service_and_category_list_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	category_name VARCHAR(250) NOT NULL,
	service_name VARCHAR(250) NOT NULL
);

SELECT * FROM service_and_category_list;

CREATE TABLE language_list(
	language_list_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	language_name VARCHAR(150) NOT NULL
);

SELECT * FROM language_list;

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

CREATE TABLE specialties_list(
	specialties_list_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	organization_name VARCHAR(300) NOT NULL,
	specialty_name VARCHAR(300) NOT NULL
);

SELECT * FROM specialties_list;

CREATE TABLE pet_medications_list(
	pet_medications_list_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	medication_name VARCHAR(300) NOT NULL
);

SELECT * FROM pet_medications_list;

CREATE TABLE pet_procedures_list(
	pet_procedures_list_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	procedure_name VARCHAR(300) NOT NULL
);

SELECT * FROM pet_procedures_list;
