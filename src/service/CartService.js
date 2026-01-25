import { api } from './axios.js';

export const addCart = async ({ productId, quantity = 1 }) => {
    try {
        const res = await api.post('/cart/add', { productId, quantity })
        return res.data;
    } catch (error) {
        console.log("Issue in Add cart service", error);
        throw error;
    }
}

export const updateQuantity = async ({ productId, quantity }) => {
    try {
        const res = await api.patch('/cart/update', { productId, quantity })
        return res.data;
    } catch (error) {
        console.log("Issue in update cart service", error);
        throw error;
    }
}

export const removeItemFromCart = async (productId) => {
    try {
        const res = await api.delete(`/cart/remove/${productId}`)
        return res.data;
    } catch (error) {
        console.log('Error in cart Service', error)
        throw error;
    }
}

export const clearCart = async () => {
    try {
        const res = await api.delete('/cart/clear')
        return res.data;
    } catch (error) {
        console.log('Error in clear cart service', error)
        throw error;
    }
}

export const getCart = async () => {
    try {
        const res = await api.get('/cart')
        return res.data;
    } catch (error) {
        console.log("Issue getting cart service", error);
        throw error;
    }
}



