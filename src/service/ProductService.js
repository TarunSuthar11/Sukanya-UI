import { api } from './axios.js'

export const fetchProducts = async (params = {}) => {
    try {
        const response = await api.get(`/product`, { params })
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
}

export const fetchSuggestions = async (query) => {
    try {
        const response = await api.get(`/product/search/suggestions?query=${query}`)
        return response.data;
    } catch (error) {
        console.error('Error fetching suggestions:', error);
        return [];
    }
}

export const fetchProduct = async (id) => {
    const res = await api.get(`/product/${id}`)

    return res.data;
}