import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { connectDatabase } from "./setup-and-security/connect"
import redisClient from "./setup-and-security/redis"
import authRoutes from "./routes/auth-ROUTES"
import privateDoctorDataRoutes from "./routes/private-doctor-data-ROUTES"
import privatePatientDataRoutes from "./routes/private-patient-data-ROUTES"
import publicDoctorDataRoutes from "./routes/public-doctor-data-ROUTES"
import searchRoutes from "./routes/search-ROUTES"
import calendarRoutes from "./routes/calendar-ROUTES"
import listsRoutes from "./routes/lists-ROUTES"
import GetIDFromUUID from "./utils/get-id-from-uuid"

dotenv.config()

const port = process.env.PORT || 8000

// Confirmation of MYSQL Connection
// eslint-disable-next-line @typescript-eslint/no-floating-promises
connectDatabase()

redisClient.on("error", function (err) {
	console.log("Something went wrong with Redis Connection " + err)
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
	res.header("Access-Control-Allow-Origin", req.headers.origin as string)
	res.header("Access-Control-Allow-Credentials", "true")
	next()
})

app.use(cors({
	credentials: true,
	origin: (origin, callback) => {
		callback(null, true)
	}
}))

app.use(cookieParser())
app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/private-doctor-data", GetIDFromUUID.doctor, privateDoctorDataRoutes)
app.use("/api/private-patient-data", GetIDFromUUID.patient, privatePatientDataRoutes)
app.use("/api/public-doctor-data", publicDoctorDataRoutes)
app.use("/api/search", searchRoutes)
app.use("/api/calendar", calendarRoutes)
app.use("/api/lists", listsRoutes)
app.use("*", (req, res) => res.status(404).json({ error: "Route not found"}))

// Initialization of server:
app.listen(port, () => {
	console.log(`listening on port ${port}`)
})
