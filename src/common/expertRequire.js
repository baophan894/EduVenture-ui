import { EXPERT } from "./constants";

export const expertRequire = () => {
  if (localStorage.getItem("role") != EXPERT) {
    console.log(12312);
    window.location.replace("/");
  }
};
