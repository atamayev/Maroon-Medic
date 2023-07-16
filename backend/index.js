import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { connection } from "./setup-and-security/connect.js"
import redisClient from "./setup-and-security/redis.js"
//ROUTES:
import authRoutes from "./routes/auth-ROUTES.js"
import privateDoctorDataRoutes from "./routes/private-doctor-data-ROUTES.js"
import privatePatientDataRoutes from "./routes/private-patient-data-ROUTES.js"
import publicDoctorDataRoutes from "./routes/public-doctor-data-ROUTES.js"
import searchRoutes from "./routes/search-ROUTES.js"
import calendarRoutes from "./routes/calendar-ROUTES.js"
import listsRoutes from "./routes/lists-ROUTES.js"
import GetIDFromUUID from "./utils/getIDFromUUID.js"

dotenv.config()

const port = process.env.PORT || 8000

// Confirmation of MYSQL Connection
connection.connect((err) => {
  if (err) throw err
})

redisClient.on("error", function (err) {
  console.log("Something went wrong " + err)
})

const app = express()

//To limit to certain routes:
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Credentials", true)
//   next()
// })

// Limits which URLs are able to access the server (8800)
// const allowedOrigins = ["https://localhost:3000", "https://192.168.1.243:3000", "http://localhost:3000", "http://192.168.1.243:3000"]
// app.use(cors({
//   origin: (origin, callback) => {
//     if (allowedOrigins.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error("Not allowed by CORS"))
//     }
//   },
// }))

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin)
  res.header("Access-Control-Allow-Credentials", true)
  next()
})

app.use(cors({
  credentials: true,
  origin: (origin, callback) => {
    callback(null, true)
  }
}))

app.use(cookieParser())
app.use(express.json()) // allows server to read json format responses

app.use("/api/auth", authRoutes)
app.use("/api/private-doctor-data", GetIDFromUUID.getDoctorIDFromUUID, privateDoctorDataRoutes)
app.use("/api/private-patient-data", GetIDFromUUID.getPatientIDFromUUID, privatePatientDataRoutes)
app.use("/api/public-doctor-data", publicDoctorDataRoutes)
app.use("/api/search", searchRoutes)
app.use("/api/calendar", calendarRoutes)
app.use("/api/lists", listsRoutes)

// Any route not specified above is not found
app.use("*", (req, res) => res.status(404).json({ error: "Route not found"})) // any link that was not previously designated is 404

// Initialization of server:
app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
