import axios from "axios";

const axiosClient = axios.create({
    // baseURL: "https://realityprint.somee.com/",
    // baseURL: "https://da847dfb-4074-4694-af72-eecce16e8f92-00-ixdps29se0ic.picard.replit.dev",
    baseURL: "http://localhost:5000",
    headers: {
        "Content-Type": "application/json",
        "content-type": "text/plain",
    },
});
export default axiosClient;
