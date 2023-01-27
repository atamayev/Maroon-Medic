import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8800/api",
  withCredentials: true,
  headers: {
    "Content-type": "application/json"
  }
});
