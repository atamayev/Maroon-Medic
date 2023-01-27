import { hash as _hash, compare } from 'bcrypt';
import dotenv from "dotenv"
dotenv.config()

export default new class Hash {
    async hash_credentials(dehashed_data) {
        const saltRounds = parseInt(process.env.SALT_ROUNDS, 10);
        let hashedData = dehashed_data;
        try {
            hashedData = await _hash(dehashed_data, saltRounds);
            // console.log('hashedData',hashedData);
            } catch (err) {
            console.log(err);
            }
        return (hashedData)
      };

    async checkPassword(plaintextPassword, hashedPassword) {
        try {
            const isMatch = await compare(plaintextPassword, hashedPassword);
            // console.log('isMatch',isMatch)
            return isMatch;
        } catch (err) {
            console.log(err);
        }
    }
}();
