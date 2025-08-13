import axios from "axios";

const axiosClient = axios.create({
  // baseURL: "https://realityprint.somee.com/",

  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
    "content-type": "text/plain",
  },
});
export default axiosClient;
