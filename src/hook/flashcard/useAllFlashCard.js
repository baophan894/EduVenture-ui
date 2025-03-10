import { useQuery } from "@tanstack/react-query";
import api from "../../api/http";

const useAllFlashCard = () => {
  return useQuery({
    queryKey: ["flashcards"],
    queryFn: () => api.get("/flashcards"),
  })?.data?.data;
};
export default useAllFlashCard;
