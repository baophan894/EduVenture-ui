import { useQuery } from "@tanstack/react-query";
import api from "../../api/http";

const useAllPublicCourse = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["PUBLIC_COURSE"],
    queryFn: () => api.get("/public/courses"),
  });
  return { courses: data?.data, isLoading };
};
export default useAllPublicCourse;
