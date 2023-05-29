USE MaroonDB;

CREATE TABLE Appointments(
appointmentsID INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
appointment_date DATETIME NOT NULL,
patient_message VARCHAR(1000),
Doctor_confirmation_status BOOLEAN NOT NULL,
Service_mapping_ID INT UNSIGNED NOT NULL, 
FOREIGN KEY (Service_mapping_ID) REFERENCES service_mapping(service_mappingID),
Patient_ID INT UNSIGNED NOT NULL, 
FOREIGN KEY (Patient_ID) REFERENCES Credentials(UserID),
Doctor_ID INT UNSIGNED NOT NULL, 
FOREIGN KEY (Doctor_ID) REFERENCES Credentials(UserID),
Addresses_ID INT UNSIGNED NOT NULL, 
FOREIGN KEY (Addresses_ID) REFERENCES addresses(addressesID)
);

SELECT * FROM appointments;

DELETE FROM appointments where Doctor_ID = 1;
