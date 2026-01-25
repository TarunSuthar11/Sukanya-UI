import { useQuery } from "@tanstack/react-query";
import { fetchProducts, fetchProduct } from "../service/ProductService";
import { api } from "../service/axios";

export const useGetProducts = (params = {}) => {
    return useQuery({
        queryKey: ["products", params],
        queryFn: () => fetchProducts(params),
    });
};

export const useGetProductDetails = (id) => {
    return useQuery({
        queryKey: ["product", id],
        queryFn: () => fetchProduct(id),
        enabled: !!id,
    });
};

export const useGetFeaturedProducts = () => {
    return useQuery({
        queryKey: ["products", "featured"],
        queryFn: async () => {
            const response = await api.get('/product/featured');
            return response.data;
        },
    });
};
