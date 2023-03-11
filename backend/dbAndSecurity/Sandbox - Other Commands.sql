SELECT
	bdi.Doctor_ID, bdi.FirstName, bdi.LastName,
    sl2.School_name, ml.Major_name, etl.Education_type, em.Start_Date, em.End_Date, 
    il.Insurance_name, 
    sl1.Organization_name, sl1.Specialty_name, 
    pn.Phone, da.address_line_1, da.address_line_2, da.city, da.state, da.zip, da.country,
    scl3.Category_name, scl3.Service_name, sm1.Service_time, sm1.Service_price,
    d.Description,
    ll.language_name,
    p.picture_link, 
    p.picture_number

FROM basic_doctor_info bdi

LEFT OUTER JOIN pictures p ON bdi.Doctor_ID = p.Doctor_ID

LEFT OUTER JOIN language_mapping lm ON bdi.Doctor_ID = lm.Doctor_ID
LEFT OUTER JOIN language_list ll ON lm.language_mappingID = ll.language_listID

LEFT OUTER JOIN descriptions d ON bdi.Doctor_ID = d.Doctor_ID

LEFT OUTER JOIN service_mapping sm1 ON bdi.Doctor_ID = sm1.Doctor_ID
LEFT OUTER JOIN service_and_category_list scl3 ON sm1.service_mapping_ID = scl3.service_and_category_listID

LEFT OUTER JOIN Doctor_addresses da ON bdi.Doctor_ID = da.Doctor_ID
LEFT OUTER JOIN phone_numbers pn ON da.addresses_ID = pn.Address_ID

LEFT OUTER JOIN specialty_mapping sm2 ON bdi.Doctor_ID = sm2.Doctor_ID
LEFT OUTER JOIN specialties_list sl1 ON sm2.Specialty_ID = sl1.specialties_listID

LEFT OUTER JOIN education_mapping em ON bdi.Doctor_ID = em.Doctor_ID
LEFT OUTER JOIN school_list sl2 ON em.School_ID = sl2.school_listID 
LEFT OUTER JOIN major_list ml ON em.Major_ID = ml.major_listID
LEFT OUTER JOIN education_type_list etl ON em.Education_type_ID = etl.education_typeID 

LEFT OUTER JOIN insurance_mapping im ON bdi.Doctor_ID = im.Doctor_ID
LEFT OUTER JOIN insurance_list il ON im.Insurance_ID = il.insurance_listID

WHERE bdi.Doctor_ID = '1000000';