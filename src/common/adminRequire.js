import { ADMIN } from "./constants";

export const adminRequire = () => {
  if (localStorage.getItem("role") != ADMIN) {
    console.log(12312);
    window.location.replace("/");
  }
};
