import { useQuery } from "@tanstack/react-query";
import api from "../../api/http";

const useAllBoughtCourse = () => {
  const token = localStorage.getItem("token");
  return useQuery({
    queryKey: ["BOUGHT_COURSE"],
    queryFn: () =>
      api.get("/course/bought", {
        headers: {
          Authorization: token,
        },
      }),
    cacheTime: Infinity,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  })?.data?.data;
};
export default useAllBoughtCourse;
