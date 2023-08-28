USE MaroonDB;

CREATE TABLE appointments(
	appointmentsID INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	appointment_date DATETIME NOT NULL,
	appointment_price DECIMAL(5,2) NOT NULL CHECK(appointment_price >= 0),
	appointment_timespan INT UNSIGNED NOT NULL CHECK(appointment_timespan >= 0),
	patient_message VARCHAR(1000),
	doctor_confirmation_status BOOLEAN NOT NULL,
	service_and_category_list_ID INT UNSIGNED NOT NULL,
	pet_info_ID INT UNSIGNED NOT NULL,
	Patient_ID INT UNSIGNED NOT NULL,
	Doctor_ID INT UNSIGNED NOT NULL,
	Addresses_ID INT UNSIGNED NOT NULL,
	created_at DATETIME NOT NULL,
	FOREIGN KEY (service_and_category_list_ID) REFERENCES service_and_category_list(service_and_category_listID),
	FOREIGN KEY (Patient_ID) REFERENCES Credentials(UserID),
	FOREIGN KEY (pet_info_ID) REFERENCES pet_info(pet_infoID),
	FOREIGN KEY (Doctor_ID) REFERENCES Credentials(UserID),
	FOREIGN KEY (Addresses_ID) REFERENCES addresses(addressesID),
	UNIQUE (appointment_date, service_and_category_list_ID, pet_info_ID, Doctor_ID)
);

ALTER TABLE appointments
CHANGE Service_and_category_list_ID service_and_category_list_ID INT UNSIGNED NOT NULL;


SELECT * FROM appointments;
UPDATE Appointments set Doctor_confirmation_status = 0 where Doctor_ID;
