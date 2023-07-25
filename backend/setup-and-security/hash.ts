import dotenv from "dotenv"
dotenv.config()
import { hash as _hash, compare } from "bcrypt"

export default new class Hash {
  async hashCredentials(unhashedData: string): Promise<string> {
    const saltRounds = process.env.SALT_ROUNDS!
    try {
      const hashedData = await _hash(unhashedData, saltRounds)
      return hashedData
    } catch (error: any) {
      throw error
    }
  }

  async checkPassword(plaintextPassword: string, hashedPassword: string): Promise<boolean> {
    try {
      const isMatch = await compare(plaintextPassword, hashedPassword)
      return isMatch
    } catch (error: any) {
      return false
    }
  }
}()
