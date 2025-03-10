import axios from "axios";
import { baseURL } from "./constants";
class Api {
  instance;
  constructor() {
    this.instance = axios.create({
      baseURL,
      timeout: 200000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    this.instance.interceptors.response.use(
      (response) => {
        if (
          response.config.url == "login" ||
          response.config.url === "social"
        ) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("role", response.data.role);
          window.location.replace("/");
        }
        return response;
      },
      (error) => {
        const statusCode = error.response.status;
        if (statusCode === 403) {
          window.location.replace("/");
        }
        if (statusCode === 401) {
          window.location.replace("/login");
        }
        if (error.response.data.message === "expired_session") {
          localStorage.removeItem("token");
          window.location.replace("login");
        }
        return Promise.reject(error);
      }
    );
  }
}
const api = new Api().instance;
export default api;
