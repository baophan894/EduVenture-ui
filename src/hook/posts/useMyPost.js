import { useQuery } from "@tanstack/react-query";
import api from "../../api/http";

const useMyPost = () => {
  const token = localStorage.getItem("token");
  return useQuery({
    queryKey: ["myposts"],
    queryFn: () =>
      api.get("/myposts", {
        headers: {
          Authorization: token,
        },
      }),
  })?.data?.data;
};
export default useMyPost;
