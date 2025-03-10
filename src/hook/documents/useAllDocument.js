import { useQuery } from "@tanstack/react-query";
import api from "../../api/http";

const useAllDocuments = () => {
  //
  return useQuery({
    queryKey: ["documents"],
    queryFn: () => api.get("/document/all"),
  })?.data?.data;
};
export default useAllDocuments;
