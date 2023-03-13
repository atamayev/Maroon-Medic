import {connection, useDB} from "../../dbAndSecurity/connect.js";

export async function fetchAllLanguages (req, res){
    const table_name = 'language_list'
    const DB_name = 'DoctorDB'
    const sql = `SELECT Language_name, language_listID FROM ${table_name}`;
    await useDB(fetchAllLanguages.name, DB_name, table_name)
    
    try{
        const [results] = await connection.execute(sql)
        return res.status(200).json(results);
    }catch(error){
        console.log(`error in ${fetchAllLanguages.name}`,error)
        return res.status(500).json(error);
    }
};

export async function fetchAllSpecialties (req, res){
    const table_name = 'specialties_list'
    const DB_name = 'DoctorDB'
    const sql = `SELECT Organization_name, Specialty_name FROM ${table_name}`;
    await useDB(fetchAllSpecialties.name, DB_name, table_name)
    
    try{
        const [results] = await connection.execute(sql)
        return res.status(200).json(results);
    }catch(error){
        console.log(`error in ${fetchAllSpecialties.name}`,error)
        return res.status(500).json(error);
    }
};

export async function fetchAllServicesAndCategories (req, res){
    const table_name = 'service_and_category_list'
    const DB_name = 'DoctorDB'
    const sql = `SELECT Service_name, Category_name FROM ${table_name}`;
    await useDB(fetchAllServicesAndCategories.name, DB_name, table_name)
    
    try{
        const [results] = await connection.execute(sql)
        return res.status(200).json(results);
    }catch(error){
        console.log(`error in ${fetchAllServicesAndCategories.name}`,error)
        return res.status(500).json(error);
    }
};

export async function fetchAllSchools (req, res){
    const table_name = 'school_list'
    const DB_name = 'DoctorDB'
    const sql = `SELECT School_name FROM ${table_name}`;
    await useDB(fetchAllSchools.name, DB_name, table_name)
    
    try{
        const [results] = await connection.execute(sql)
        return res.status(200).json(results);
    }catch(error){
        console.log(`error in ${fetchAllSchools.name}`,error)
        return res.status(500).json(error);
    }
};

export async function fetchAllMajors (req, res){
    const table_name = 'major_list'
    const DB_name = 'DoctorDB'
    const sql = `SELECT Major_name FROM ${table_name}`;
    await useDB(fetchAllMajors.name, DB_name, table_name)
    
    try{
        const [results] = await connection.execute(sql)
        return res.status(200).json(results);
    }catch(error){
        console.log(`error in ${fetchAllMajors.name}`,error)
        return res.status(500).json(error);
    }
};

export async function fetchAllInsurances (req, res){
    const table_name = 'insurance_list'
    const DB_name = 'DoctorDB'
    const sql = `SELECT Insurance_name FROM ${table_name}`;
    await useDB(fetchAllInsurances.name, DB_name, table_name)
    
    try{
        const [results] = await connection.execute(sql)
        return res.status(200).json(results);
    }catch(error){
        console.log(`error in ${fetchAllInsurances.name}`,error)
        return res.status(500).json(error);
    }
};

export async function fetchAllEducationTypes (req, res){
    const table_name = 'education_type_list'
    const DB_name = 'DoctorDB'
    const sql = `SELECT Education_type FROM ${table_name}`;
    await useDB(fetchAllEducationTypes.name, DB_name, table_name)
    
    try{
        const [results] = await connection.execute(sql)
        return res.status(200).json(results);
    }catch(error){
        console.log(`error in ${fetchAllEducationTypes.name}`,error)
        return res.status(500).json(error);
    }
};
