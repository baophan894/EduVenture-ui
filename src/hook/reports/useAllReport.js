import { useQuery } from "@tanstack/react-query";
import api from "../../api/http";

const useAllReport = () => {
  const token = localStorage.getItem("token");
  return useQuery({
    queryKey: ["reports"],
    queryFn: () =>
      api.get("/reports", {
        headers: {
          Authorization: token,
        },
      }),
    cacheTime: Infinity,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  })?.data?.data;
};
export default useAllReport;
