import { useQuery } from "@tanstack/react-query";
import api from "../../api/http";

const useUserInfo = () => {
  const token = localStorage.getItem("token");
  return useQuery({
    queryKey: ["PROFILE"],
    queryFn: () =>
      api.get("/profile", {
        headers: {
          Authorization: token,
        },
      }),
    enabled: !!token,
  })?.data?.data;
};
export default useUserInfo;
