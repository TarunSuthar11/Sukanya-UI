import {api} from './axios.js'

export const fetchProducts = async () => {
    
    const response = await api.get(`/product`)

    return response.data;
}

export const fetchProduct = async (id) => {
    const res = await api.get(`/product/${id}`)

    return res.data;
}