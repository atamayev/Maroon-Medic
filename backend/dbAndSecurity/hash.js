import { hash as _hash, compare } from 'bcrypt';
import dotenv from "dotenv"
dotenv.config()

export default new class Hash {
    /** hash_credentials: Async function which hashes the user's password
     *  Async function because hashing takes time, and breaks the program if not async
     * @param {String} dehashed_data Password
     * @returns hashedData: Hashed Password
     */
    async hash_credentials(dehashed_data) {
        const saltRounds = parseInt(process.env.SALT_ROUNDS, 10);
        try {
            const hashedData = await _hash(dehashed_data, saltRounds);
            return (hashedData)
        } catch(error){
            console.log('Error in hash_credentials', error);
        }
      };
    
    /** checkPassword: self-explanatory
     *  Async function because hashing takes time, and breaks the program if not async
     * @param {String} plaintextPassword 
     * @param {String} hashedPassword 
     * @returns True/False Boolean
     */
    async checkPassword(plaintextPassword, hashedPassword) {
        try {
            const isMatch = await compare(plaintextPassword, hashedPassword);
            return isMatch;
        } catch(error){
            console.log('Error in checkPassword', error);
            return false;
        }
    }
}();
