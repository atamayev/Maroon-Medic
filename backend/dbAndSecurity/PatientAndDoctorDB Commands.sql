-- not created yet, unable to reference keys in other DBs, consider moving all tables into 1 DB
CREATE TABLE Appointments(
appointmentsID INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
appointment_date DATE NOT NULL,
patient_message VARCHAR(1000),
Service_mapping_ID INT UNSIGNED NOT NULL, 
FOREIGN KEY (Service_mapping_ID) REFERENCES service_mapping(service_mappingID),
Patient_ID INT UNSIGNED NOT NULL, 
FOREIGN KEY (Patient_ID) REFERENCES Credentials(UserID),
Doctor_ID INT UNSIGNED NOT NULL, 
FOREIGN KEY (Doctor_ID) REFERENCES Credentials(UserID),
Addresses_ID INT UNSIGNED NOT NULL, 
FOREIGN KEY (Addresses_ID) REFERENCES addresses(addresses_ID)
);
