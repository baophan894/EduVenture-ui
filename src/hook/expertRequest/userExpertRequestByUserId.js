import { useQuery } from "@tanstack/react-query";
import api from "../../api/http";

const useExpertRequestByUserId = () => {
  const token = localStorage.getItem("token");
  return useQuery({
    queryKey: ["my_request"],
    queryFn: () =>
      api.get("/expert-requests/my-request", {
        headers: {
          Authorization: token,
        },
      }),
  })?.data?.data;
};
export default useExpertRequestByUserId;
