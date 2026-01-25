import { api } from "./axios";

export const createReview = async (formData) => {
    const response = await api.post("/review/create", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};

export const getProductReviews = async (productId, page = 1) => {
    const response = await api.get(`/review/${productId}?page=${page}`);
    return response.data;
};

// Alias for backwards compatibility
export const fetchReviews = getProductReviews;

export const deleteReview = async (id) => {
    const response = await api.delete(`/review/delete/${id}`);
    return response.data;
};