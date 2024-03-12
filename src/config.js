import axios from "axios";

export const axiosInstance = axios.create({
    baseURL :"https://net-watch-backend.vercel.app/api/"
})