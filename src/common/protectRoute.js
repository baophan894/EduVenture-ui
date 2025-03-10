export const loginRequire = () => {
  if (!localStorage.getItem("token")) window.location.replace("/login");
};
