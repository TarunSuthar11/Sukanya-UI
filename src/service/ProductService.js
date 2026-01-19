import { api } from './axios.js'

export const fetchProducts = async () => {

    try {
        const response = await api.get(`/product`)
        return response.data;
    } catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }
}

export const fetchProduct = async (id) => {
    const res = await api.get(`/product/${id}`)

    return res.data;
}