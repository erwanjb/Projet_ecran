import axios from "axios";

axios.defaults.withCredentials = true;  // permet à axios de poster des cookies, default false
axios.defaults.baseURL = "http://localhost:8081"

export default axios.defaults