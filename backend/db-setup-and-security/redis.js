import Redis from "ioredis"
import dotenv from "dotenv"
dotenv.config()

/**
 * redisClient establishes an asynchronus connection using keys in .env
 */
const redisClient = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT
})

export default redisClient
