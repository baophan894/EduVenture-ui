import { useQuery } from "@tanstack/react-query";
import api from "../../api/http";

const useAllFlashCarPublic = () => {
  return useQuery({
    queryKey: ["flashcards"],
    queryFn: () => api.get("/flashcards/active-public-or-sell"),
  })?.data?.data;
};
export default useAllFlashCarPublic;
