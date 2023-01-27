import { v4 as uuidv4 } from 'uuid';
import { connection, useDB } from './connect.js';

export async function ID_to_UUID(DoctorID){
    console.log('DoctorID', DoctorID )
    const UUID = uuidv4();
  
    const table_name = 'UUID_reference';
    const DB_name = 'DoctorDB';
  
    await useDB(ID_to_UUID.name, DB_name, `${table_name}`)
    const sql = `INSERT INTO ${table_name} (UUID, Doctor_ID) VALUES (?, ?)`;
    const values = [UUID, DoctorID ];  
  
    try {
        await connection.execute(sql, values)
        // console.log('UUID returned', UUID)
        return UUID
    }catch(error){
      return ('error in UUID:', error)
    }
  }
  
export async function UUID_Join(UUID){
    
  }