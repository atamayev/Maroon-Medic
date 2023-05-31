USE MaroonDB;

CREATE TABLE Appointments(
	appointmentsID INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	appointment_date DATETIME NOT NULL,
	patient_message VARCHAR(1000),
	Doctor_confirmation_status BOOLEAN NOT NULL,
	Service_and_category_list_ID INT UNSIGNED NOT NULL, 
	Patient_ID INT UNSIGNED NOT NULL, 
	Doctor_ID INT UNSIGNED NOT NULL, 
	Addresses_ID INT UNSIGNED NOT NULL, 
    Created_at DATETIME NOT NULL,
	FOREIGN KEY (Service_and_category_list_ID) REFERENCES service_and_category_list(service_and_category_listID),
	FOREIGN KEY (Patient_ID) REFERENCES Credentials(UserID),
	FOREIGN KEY (Doctor_ID) REFERENCES Credentials(UserID),
	FOREIGN KEY (Addresses_ID) REFERENCES addresses(addressesID),
	UNIQUE (appointment_date, Service_and_category_list_ID, Patient_ID, Doctor_ID)
);

SELECT * FROM appointments;
