import { createCipheriv, createDecipheriv } from 'crypto';
import dotenv from "dotenv"
dotenv.config()

export default new class Crypto {
    encrypt_single_entry (decryptedData){ // encrypts all fields in an object.
        const iv = Buffer.from(process.env.ENCRYPTION_IV, 'hex');
        const secretKey = Buffer.from(process.env.ENCRYPTION_SECRET_KEY, 'hex');
        let encryptedData = decryptedData;
        const keys = Object.keys(decryptedData)
        const includedKeys = keys;

        for (const key of includedKeys){
            const cipher = createCipheriv('aes-256-cbc', secretKey, iv);
            encryptedData[key] = cipher.update(decryptedData[key], 'utf8', 'hex');
            encryptedData[key] += cipher.final('hex');
            // console.log(`encryptedData[key], ${key}`, encryptedData[key])
        }
        return (encryptedData)
    }
    
    decrypt_multiple (encryptedData){//decrypts multiple records - for the home page
        const decryptedRecords = [];

        for (const record of encryptedData){
            const iv = Buffer.from(process.env.ENCRYPTION_IV, 'hex');
            const secretKey = Buffer.from(process.env.ENCRYPTION_SECRET_KEY, 'hex');
    
            let decryptedData = {}
            decryptedData = record;
            //extracts only the keys from decryptedData:
            const keys = Object.keys(decryptedData)
            
            //splices the important keys for decryption. Only the first and last name need to be decrypted.
            // the ID, IV, and Secret Key are not decrypted.
            const includedKeys = keys;
    
            for (const key of includedKeys){
                const decipher = createDecipheriv('aes-256-cbc', secretKey, iv);
                decryptedData[key] = decipher.update(record[key], 'hex', 'utf8');
                decryptedData[key] += decipher.final('utf8');
            }
            decryptedRecords.push(decryptedData)
        }
    return decryptedRecords
    }

    decryptSingle(encrypted_single){ // decrypts a single record - for the individual vet pagess
        // console.log('encrypted single',encrypted_single)
        const iv = Buffer.from(process.env.ENCRYPTION_IV, 'hex');
        const secretKey = Buffer.from(process.env.ENCRYPTION_SECRET_KEY, 'hex');

        let decryptedData = {}
        decryptedData = encrypted_single;
        //extracts only the keys from decryptedData:
        const keys = Object.keys(decryptedData)

        const includedKeys = keys.slice(2);

        for (const key of includedKeys){
            const decipher = createDecipheriv('aes-256-cbc', secretKey, iv);
            decryptedData[key] = decipher.update(encrypted_single[key], 'hex', 'utf8');
            decryptedData[key] += decipher.final('utf8');
        }
        return decryptedData
    }
        // encrypt_credentials (decryptedData){
    //     const iv = Buffer.from('c3963cedd7f49caa979d597988bbda9a', 'hex');
    //     const secretKey = Buffer.from('06d6668c3b18bdf2707a8832cbb75be54dc94068d8a50621fa36401133bc3439', 'hex');
    //     let encryptedData = decryptedData;

    //     const keys = Object.keys(decryptedData)

    //     const includedKeys = keys.slice(1); // to not encrypt email

    //     for (const key of includedKeys){
    //         const cipher = createCipheriv('aes-256-cbc', secretKey, iv);
    //         encryptedData[key] = cipher.update(decryptedData[key], 'utf8', 'hex');
    //         encryptedData[key] += cipher.final('hex');
    //         // console.log(`encryptedData[key], ${key}`, encryptedData[key])
    //     }
    //     // console.log('encryptedData', encryptedData)
    //     return (encryptedData)
    // }
        // encrypt_defunct (decryptedData){ // Defunt bc this generates a random iv/secret key for each user.
    //     // This is for generating random iv's and secret strings. not using anymore, giving everyone the same key
    //         // Generate a random IV
    //         //const iv = randomBytes(16);
    //         // Generate a random secret key
    //         //const secretKey = randomBytes(32);
    //         // Encode the iv as a hexadecimal string
    //         //const ivHex = iv.toString('hex');
    //         // Encode the secret key as a hexadecimal string
    //         //const secretKeyHex = secretKey.toString('hex');

    //     // makes a new variable that only returns the values of the decrypted Data object, not the keys
    //     const dataValues = Object.values(decryptedData);
    //     // console.log('data values[0]',dataValues[0])
    //     // console.log('data values[1]',dataValues[1])

    //     let encryptedData = {};
      
    //     for (const field in dataValues){
    //         // Encrypt the field values
    //         const cipher = createCipheriv('aes-256-cbc', secretKey, iv);
    //         encryptedData[field] = cipher.update(dataValues[field], 'utf8', 'hex');
    //         encryptedData[field] += cipher.final('hex');
    //     }
    //     // console.log('encryptedData', encryptedData )
    //     return ({encryptedData, ivHex, secretKeyHex})
    // }

    // decrypt_defunct (encryptedData){
    //     // console.log('encryptedData from decrypt',encryptedData)
    //     const decryptedRecords = [];

    //     for (const record of encryptedData){
    //         // console.log('encrypted single',record)

    //         // Decode the secret key from a hexadecimal string to a Buffer object
    //         const secretKey = Buffer.from(record.secret_key, 'hex');
    //         // console.log('secret key',secretKey)
    
    //         // Decode the iv from a hexadecimal string to a Buffer object
    //         const iv = Buffer.from(record.iv, 'hex');
    
    //         let decryptedData = {}
    //         decryptedData = record;
    //         //extracts only the keys from decryptedData:
    //         const keys = Object.keys(decryptedData)
            
    //         //splices the important keys for decryption. Only the first and last name need to be decrypted.
    //         // the ID, IV, and Secret Key are not decrypted.
    //         const includedKeys = keys.slice(1, keys.length - 2);      
    //         // console.log('includedKeys', includedKeys)
    
    //         for (const key of includedKeys){
    //             const decipher = createDecipheriv('aes-256-cbc', secretKey, iv);
    //             // console.log(`key`,key)
    //             // console.log('decryptedData[key]',decryptedData[key])
    //             decryptedData[key] = decipher.update(record[key], 'hex', 'utf8');
    //             decryptedData[key] += decipher.final('utf8');
    //             // console.log('decryptedData[email]',decryptedData[key])
    //         }
    //         // console.log(decryptedData);  // Outputs: Sensitive data that should be encrypted
    //         decryptedRecords.push(decryptedData)
    //         // console.log(decryptedRecords)
    //     }

    // // console.log(decryptedRecords);  // Outputs: Sensitive data that should be encrypted
    // return decryptedRecords
    // }
}