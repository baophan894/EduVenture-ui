import { useQuery } from "@tanstack/react-query";
import api from "../../api/http";

const useAllExpertRequest = () => {
  const token = localStorage.getItem("token");
  return useQuery({
    queryKey: ["expert_request"],
    queryFn: () =>
      api.get("/expert-requests/all", {
        headers: {
          Authorization: token,
        },
      }),
  })?.data?.data;
};
export default useAllExpertRequest;
