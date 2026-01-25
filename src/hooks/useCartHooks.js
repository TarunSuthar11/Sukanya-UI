import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addCart, getCart, removeItemFromCart, updateQuantity, clearCart } from "../service/CartService";


export const useAddToCart = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: addCart,
        onSuccess: () => {
            queryClient.invalidateQueries(["cart"]);
        }
    })
};

export const useGetCart = () => {
    return useQuery({
        queryKey: ['cart'],
        queryFn: getCart,
        staleTime: 5 * 60 * 1000,
    })
};

export const useRemoveFromCart = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: removeItemFromCart,
        onSuccess: () => {
            queryClient.invalidateQueries(["cart"]);
        },
    });
};


export const useUpdateCart = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateQuantity,
        onSuccess: () => {
            queryClient.invalidateQueries(["cart"]);
        },
    });
};

export const useClearCart = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: clearCart,
        onSuccess: () => {
            queryClient.invalidateQueries(["cart"]);
        },
    });
};