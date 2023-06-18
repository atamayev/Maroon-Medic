import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
import { connection } from "./dbAndSecurityAndHelperFunctions/connect.js";
//ROUTES:
import authRoutes from "./routes/authROUTES.js";
import privateDoctorDataRoutes from "./routes/privateDoctorDataROUTES.js";
import privatePatientDataRoutes from "./routes/privatePatientDataROUTES.js"
import publicDoctorDataRoutes from "./routes/publicDoctorDataROUTES.js";
import searchRoutes from "./routes/searchROUTES.js";
import calendarRoutes from "./routes/calendarROUTES.js"

dotenv.config()

const port = process.env.PORT || 8000

// Confirmation of DB Connection
connection.connect((err) => {
  if (err) throw err;
})

const app = express();
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true);
    next();
});

// Limits which URLs are able to access the server (8800)
const allowedOrigins = ['https://localhost:3000', 'https://192.168.1.243:3000', 'http://localhost:3000', 'http://192.168.1.243:3000'];
app.use(cors({
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
}));

app.use(cookieParser());
app.use(express.json()) // allows server to read json format responses

app.use("/api/auth", authRoutes);
app.use("/api/private-doctor-data", privateDoctorDataRoutes);
app.use("/api/private-patient-data", privatePatientDataRoutes);
app.use("/api/public-doctor-data", publicDoctorDataRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/calendar", calendarRoutes);

// Any route not specified above is not found
app.use("*", (req, res) => res.status(404).json({ error: "Route not found"})) // any link that was not previously designated is 404

// Initialization of server:
app.listen(port, () => {
    console.log(`listening on port ${port}`)
})
