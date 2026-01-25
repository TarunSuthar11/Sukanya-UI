import { api } from './axios';

export const createOrder = async (orderData) => {
    try {
        const response = await api.post('/order/create', orderData);
        return response.data;
    } catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }
};

export const getOrders = async () => {
    try {
        const response = await api.get('/order/my-orders');
        return response.data;
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
};

export const getOrderById = async (orderId) => {
    try {
        const response = await api.get(`/order/details/${orderId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching order:', error);
        throw error;
    }
};

export const cancelOrder = async ({ orderId, reason }) => {
    try {
        const res = await api.patch(`/order/cancel/${orderId}`, { reason })
        return res.data;
    } catch (error) {
        console.error('Error while Canceling Order', error);
        throw error;
    }
}

export const downloadOrderReceipt = async (orderId) => {
    try {
        const response = await api.get(`/order/receipt/download/${orderId}`, {
            responseType: 'blob'
        });
        return response.data;
    } catch (error) {
        console.error('Error downloading receipt:', error);
        throw error;
    }
}
