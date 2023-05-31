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
-- delete from appointments where Doctor_ID;

SELECT
    a.appointmentsID,
    a.appointment_date,
    a.patient_message,
    a.Doctor_confirmation_status,
    a.Created_at,
    s.Category_name,
    s.Service_name,
    sm.Service_time,
    ad.address_title,
    ad.address_line_1,
    ad.address_line_2,
    ad.city,
    ad.state,
    ad.zip,
    ad.country,
    bu.FirstName AS Doctor_FirstName,
    bu.LastName AS Doctor_LastName
FROM
    Appointments a
    INNER JOIN service_and_category_list s ON a.Service_and_category_list_ID = s.service_and_category_listID
    INNER JOIN addresses ad ON a.Addresses_ID = ad.addressesID AND ad.Doctor_ID = a.Doctor_ID
    INNER JOIN basic_user_info bu ON a.Doctor_ID = bu.User_ID
    INNER JOIN service_mapping sm ON a.Service_and_category_list_ID = sm.Service_and_Category_ID AND a.Doctor_ID = sm.Doctor_ID
WHERE
    a.Patient_ID = 3
    and a.Doctor_confirmation_status = 1;
