import { createCipheriv, createDecipheriv } from 'crypto';
import dotenv from "dotenv"
dotenv.config()

// Not sure if there's any actual functional advantage of grouping these functions in a class.
export default new class Crypto {
    /** encrypt_single_entry: self explanatory name
     *  Takes the IV/Secret Key from .env file (makes them into a buffer from a hex), and encrypts a single 'row' of data
     *  For example: ['bob', 'smith', 'male'] is turned into ['asdasdjanskdna', 'akjsndkjsankd', 'asdasdgff'']
     *  Used in authCTRL to encrypt the dateTime Object for example, or in profileCTRL to encrypt doc data
     * @param {Array} decryptedData A 1*n array
     * @returns An encrypted 1*n array
     */
    encrypt_single_entry (decryptedData){
        const iv = Buffer.from(process.env.ENCRYPTION_IV, 'hex');
        const secretKey = Buffer.from(process.env.ENCRYPTION_SECRET_KEY, 'hex');
        
        let encryptedData = decryptedData;
        const keys = Object.keys(decryptedData)

        for (const key of keys){
            const cipher = createCipheriv('aes-256-cbc', secretKey, iv);
            encryptedData[key] = cipher.update(decryptedData[key], 'utf8', 'hex');
            encryptedData[key] += cipher.final('hex');
        }
        return (encryptedData)
    }

    /** decryptSingle: Decrypts a single record (usually for the individual vet pages)
     *  Takes the IV/Secret Key from .env file (makes them into a buffer from a hex), and decrypts a single 'row' of data
     *  For example: ['asdasdjanskdna', 'akjsndkjsankd', 'asdasdgff''] is turned into ['bob', 'smith', 'male'] 
     *  Used in userCTRL to decrypt user data when showing to the client (for the individual vet pages)
     * @param {Array} encrypted_single A 1*n array
     * @returns A decrypted 1*n array
     */
    decryptSingle(encrypted_single){
        const iv = Buffer.from(process.env.ENCRYPTION_IV, 'hex');
        const secretKey = Buffer.from(process.env.ENCRYPTION_SECRET_KEY, 'hex');

        let decryptedData = encrypted_single;
        const keys = Object.keys(decryptedData)

        // The first element in the array is spliced to delete the already decrypted email
        const includedKeys = keys.slice(1); 

        for (const key of includedKeys){
            const decipher = createDecipheriv('aes-256-cbc', secretKey, iv);
            decryptedData[key] = decipher.update(encrypted_single[key], 'hex', 'utf8');
            decryptedData[key] += decipher.final('utf8');
        }
        return decryptedData
    };
    
    /** decrypt_multiple: Decrypts a array of objects. Used for the home screen (although not currently being used since no encrypted data appears on the home screen)
     *  Works the same as decrypt single, except iterates over multiple objects.
     * @param {Array} encryptedData Array of objects to decrypt
     * @returns decryptedRecords. An array of decrypted objects
     */
    decrypt_multiple (encryptedData){
        const decryptedRecords = [];

        for (const record of encryptedData){
            const iv = Buffer.from(process.env.ENCRYPTION_IV, 'hex');
            const secretKey = Buffer.from(process.env.ENCRYPTION_SECRET_KEY, 'hex');
    
            let decryptedData = record
            // decryptedData = record;
            const keys = Object.keys(decryptedData)
            
            for (const key of keys){
                const decipher = createDecipheriv('aes-256-cbc', secretKey, iv);
                decryptedData[key] = decipher.update(record[key], 'hex', 'utf8');
                decryptedData[key] += decipher.final('utf8');
            }
            decryptedRecords.push(decryptedData)
        }
    return decryptedRecords
    };
}();
