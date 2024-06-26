import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://realityprint.somee.com/",

  //baseURL: "https://localhost:7170/",
  headers: {
    "Content-Type": "application/json",
    "content-type": "text/plain",
  },
});
export default axiosClient;
