declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // Mysql DB:
      MYSQL_USER: string
      MYSQL_HOST: string
      MYSQL_PASSWORD: string
      MYSQL_DATABASE: string

      // Redis:
      REDIS_HOST: string
      REDIS_PORT: string

      // Encryption:
      ENCRYPTION_IV: string
      ENCRYPTION_SECRET_KEY: string

      // Hash:
      SALT_ROUNDS: string

      // JWT
      DOCTOR_JWT_KEY: string
      PATIENT_JWT_KEY: string

      PORT: string

    }
  }
}

export {}
