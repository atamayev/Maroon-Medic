import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
import { connection } from "./dbAndSecurity/connect.js";
import authRoutes from "./routes/authROUTES.js";
import publicDataRoutes from "./routes/publicDataROUTES.js";
import searchRoutes from "./routes/searchROUTES.js";
import privateDataRoutes from "./routes/privateDataROUTES.js";

dotenv.config()

const port = process.env.PORT || 8000

// Confirmation of DB Connection
connection.connect((err) => {
    if(err) throw err;
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
app.use("/api/public-data", publicDataRoutes);
app.use("/api/private-data", privateDataRoutes);
app.use("/api/search", searchRoutes);

// Any route not specified above is not found
app.use("*", (req, res) => res.status(404).json({ error: "Route not found"})) // any link that was not previously designated is 404

// Initialization of server:
app.listen(port, ()=>{
    console.log(`listening on port ${port}`)
})
