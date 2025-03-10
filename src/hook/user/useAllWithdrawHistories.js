import { useQuery } from "@tanstack/react-query";
import api from "../../api/http";


const useAllWithdrawHistories = () => {

  return useQuery({
    queryKey: ["Withdraw"],
    queryFn: () => api.get("/withdraw/all-histories"),
    cacheTime: Infinity, 
    staleTime: Infinity, 
    refetchOnWindowFocus: false,
  })?.data?.data;
};

export default useAllWithdrawHistories;
