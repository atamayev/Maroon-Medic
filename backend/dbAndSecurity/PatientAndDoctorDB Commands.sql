CREATE DATABASE PatientAndDoctorDB;
use PatientAndDoctorDB;

-- not created yet, unable to reference keys in other DBs, consider moving all tables into 1 DB
CREATE TABLE Appointments(
appointments_ID INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
appointment_year VARCHAR(5) NOT NULL,
appointment_month VARCHAR(5) NOT NULL,
appointment_day VARCHAR(5) NOT NULL,
appointment_hour VARCHAR(5) NOT NULL,
appointment_minute VARCHAR(5) NOT NULL,
patient_message VARCHAR(1000),
Patient_ID INT UNSIGNED NOT NULL, 
FOREIGN KEY (Patient_ID) REFERENCES Patient_credentials(PatientID),
Doctor_ID INT UNSIGNED NOT NULL, 
FOREIGN KEY (Doctor_ID) REFERENCES Doctor_credentials(DoctorID),
Service_mapping_ID INT UNSIGNED NOT NULL, 
FOREIGN KEY (Service_mapping_ID) REFERENCES service_mapping(service_mappingID),
Addresses_ID INT UNSIGNED NOT NULL, 
FOREIGN KEY (Patient_ID) REFERENCES doctor_addresses(addresses_ID)
);

