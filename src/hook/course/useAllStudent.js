import { useQuery } from "@tanstack/react-query";
import api from "../../api/http";

const useAllStudent = (courseId) => {
  const token = localStorage.getItem("token");
  return useQuery({
    queryKey: ["STUDENTS"],
    queryFn: () =>
      api.get(`/course/students?courseId=${courseId}`, {
        headers: {
          Authorization: token,
        },
      }),
    enabled: !!courseId,
  });
};
export default useAllStudent;
