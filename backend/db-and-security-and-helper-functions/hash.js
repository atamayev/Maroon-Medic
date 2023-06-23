import dotenv from "dotenv"
dotenv.config()
import { hash as _hash, compare } from 'bcrypt';

export default new class Hash {
    /** hashCredentials: Async function which hashes the user's password
     *  Async function because hashing takes time, and breaks the program if not async
     * @param {String} unhashedData Password
     * @returns hashedData: Hashed Password
     */
    async hashCredentials(unhashedData) {
        const saltRounds = parseInt(process.env.SALT_ROUNDS, 10);
        try {
            const hashedData = await _hash(unhashedData, saltRounds);
            return (hashedData)
        } catch (error) {
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
        } catch (error) {
            return false;
        }
    }
}();
