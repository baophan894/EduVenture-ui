import { useQuery } from "@tanstack/react-query";
import api from "../../api/http";

const useAllPendingCourse = () => {
  const token = localStorage.getItem("token");
  return useQuery({
    queryKey: ["PENDING_COURSE"],
    queryFn: () =>
      api.get("/course/pending", {
        headers: {
          Authorization: token,
        },
      }),
    cacheTime: Infinity,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  })?.data?.data;
};
export default useAllPendingCourse;
