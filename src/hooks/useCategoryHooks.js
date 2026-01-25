import { useQuery } from "@tanstack/react-query";
import { fetchCategory } from "../service/CategoryService";

export const useGetCategories = () => {
    return useQuery({
        queryKey: ["categories"],
        queryFn: fetchCategory,
        staleTime: 60 * 60 * 1000, // 1 hour
    });
};
