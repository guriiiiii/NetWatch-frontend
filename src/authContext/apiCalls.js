import axios from "axios";
import { loginFailure, loginStart, loginSuccess } from "./AuthActions";

// Create an instance of Axios with custom configuration
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_PROXY_URL // Assuming you've defined this environment variable
});

export const login = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    // Use the axios instance for making requests
    const res = await axiosInstance.post("auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};
