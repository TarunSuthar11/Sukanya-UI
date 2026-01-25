import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createOrder, getOrders, getOrderById, cancelOrder, downloadOrderReceipt } from "../service/OrderService";

export const useCreateOrder = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createOrder,
        onSuccess: () => {
            queryClient.invalidateQueries(["orders"]);
            queryClient.invalidateQueries(["cart"]);
        }
    });
};

export const useGetMyOrders = () => {
    return useQuery({
        queryKey: ["orders"],
        queryFn: getOrders,
        staleTime: 5 * 60 * 1000,
    });
};

export const useGetOrderDetails = (orderId) => {
    return useQuery({
        queryKey: ["order", orderId],
        queryFn: () => getOrderById(orderId),
        enabled: !!orderId,
        staleTime: 5 * 60 * 1000,
    });
};

export const useCancelOrder = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: cancelOrder,
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries(["orders"]);
            queryClient.invalidateQueries(["order", variables.orderId]);
        }
    });
};

export const useDownloadReceipt = () => {
    return useMutation({
        mutationFn: downloadOrderReceipt,
        onSuccess: (data, orderId) => {
            const url = window.URL.createObjectURL(new Blob([data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `receipt-${orderId}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        }
    });
};
