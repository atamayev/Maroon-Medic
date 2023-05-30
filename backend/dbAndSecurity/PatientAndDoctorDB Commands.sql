USE MaroonDB;

CREATE TABLE Appointments(
	appointmentsID INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	appointment_date DATETIME NOT NULL,
	patient_message VARCHAR(1000),
	Doctor_confirmation_status BOOLEAN NOT NULL,
	Service_mapping_ID INT UNSIGNED NOT NULL, 
	Patient_ID INT UNSIGNED NOT NULL, 
	Doctor_ID INT UNSIGNED NOT NULL, 
	Addresses_ID INT UNSIGNED NOT NULL, 
	FOREIGN KEY (Service_mapping_ID) REFERENCES service_mapping(service_mappingID),
	FOREIGN KEY (Patient_ID) REFERENCES Credentials(UserID),
	FOREIGN KEY (Doctor_ID) REFERENCES Credentials(UserID),
	FOREIGN KEY (Addresses_ID) REFERENCES addresses(addressesID),
	UNIQUE (appointment_date, Service_mapping_ID, Patient_ID, Doctor_ID)
);

SELECT * FROM appointments;
