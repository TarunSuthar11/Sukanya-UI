import { api } from './axios.js';

export const addCart = async () => {
    try {
        const res = await api.post('/cart/add')
        return res.data;
    } catch (error) {
        console.log("Issue in Add cart service", error);
    }
}

export const updateQuantity = async () => {
    try {
        const res = await api.patch('/cart/update')
        return res.data;
    } catch (error) {
        console.log("Issue in update cart service", error);
    }
}

export const deleteItemFromCart = async ({productId}) => {
    try {
        api.delete(`/cart/delete/${productId}`)
    } catch (error) {
        console.log('Error in cart Service',error)
    }
}

export const getCart = async () => {
    try {
        const res = await api.get('/cart')
        return res.data;
    } catch (error) {
        console.log("Issue getting cart service", error);
    }
}



