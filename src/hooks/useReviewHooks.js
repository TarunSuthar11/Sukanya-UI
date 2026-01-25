import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createReview, getProductReviews, deleteReview } from "../service/ReviewService";
import { toast } from "react-hot-toast";

export const useCreateReview = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createReview,
        onSuccess: (data) => {
            toast.success("Review submitted! Thank you for your feedback.");
            queryClient.invalidateQueries(["product-reviews"]);
        },
        onError: (error) => {
            toast.error(error?.response?.data?.message || "Failed to submit review");
        }
    });
};

export const useGetProductReviews = (productId, page = 1) => {
    return useQuery({
        queryKey: ["product-reviews", productId, page],
        queryFn: () => getProductReviews(productId, page),
        enabled: !!productId,
    });
};

export const useDeleteReview = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteReview,
        onSuccess: () => {
            toast.success("Review deleted successfully");
            queryClient.invalidateQueries(["product-reviews"]);
        }
    });
};
