import dotenv from "dotenv"
dotenv.config()
import Redis from "ioredis"

const redisClient = new Redis({
	host: process.env.REDIS_HOST as string,
	port: Number(process.env.REDIS_PORT),
})

export default redisClient
