USE MaroonDB;

CREATE TABLE appointments(
	appointments_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	appointment_date DATETIME NOT NULL,
	appointment_price DECIMAL(5,2) NOT NULL CHECK(appointment_price >= 0),
	appointment_timespan INT UNSIGNED NOT NULL CHECK(appointment_timespan >= 0),
	patient_message VARCHAR(1000),
	doctor_confirmation_status BOOLEAN NOT NULL,
	service_and_category_list_id INT UNSIGNED NOT NULL,
	pet_info_id INT UNSIGNED NOT NULL,
	patient_id INT UNSIGNED NOT NULL,
	doctor_id INT UNSIGNED NOT NULL,
	addresses_id INT UNSIGNED NOT NULL,
	created_at DATETIME NOT NULL,
	FOREIGN KEY (service_and_category_list_id) REFERENCES service_and_category_list(service_and_category_listID),
	FOREIGN KEY (patient_id) REFERENCES Credentials(user_id),
	FOREIGN KEY (pet_info_id) REFERENCES pet_info(pet_infoID),
	FOREIGN KEY (doctor_id) REFERENCES Credentials(user_id),
	FOREIGN KEY (addresses_id) REFERENCES addresses(addressesID),
	UNIQUE (appointment_date, service_and_category_list_ID, pet_info_ID, doctor_id)
);


SELECT * FROM appointments;
UPDATE Appointments set Doctor_confirmation_status = 0 where doctor_id;
