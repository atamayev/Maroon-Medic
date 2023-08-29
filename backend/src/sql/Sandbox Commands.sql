SELECT
    a.appointments_id,
    a.appointment_date,
    a.patient_message,
    a.doctor_confirmation_status,
    a.created_at,
    s.Category_name,
    s.service_name,
    sm.service_time,
    ad.address_title,
    ad.address_line_1,
    ad.address_line_2,
    ad.city,
    ad.state,
    ad.zip,
    ad.country,
    bu.first_name AS Doctor_FirstName,
    bu.last_name AS Doctor_LastName
FROM
    Appointments a
    INNER JOIN service_and_category_list s ON a.service_and_category_list_ID = s.service_and_category_listID
    INNER JOIN addresses ad ON a.Addresses_ID = ad.addressesID AND ad.doctor_id = a.doctor_id
    INNER JOIN basic_user_info bu ON a.doctor_id = bu.User_ID
    INNER JOIN service_mapping sm ON a.service_and_category_list_ID = sm.Service_and_Category_ID AND a.doctor_id = sm.doctor_id
WHERE
    a.patient_id = 3
    and a.doctor_confirmation_status = 1;
