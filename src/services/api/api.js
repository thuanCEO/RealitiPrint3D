import axios from "axios";

const axiosClient = axios.create({
  // baseURL: 'https://3.27.235.74/',
  baseURL: "https://localhost:7170/",
  headers: {
    "Content-Type": "application/json",
    "content-type": "text/plain",
  },
});
export default axiosClient;
