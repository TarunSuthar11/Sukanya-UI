import {api} from './axios.js'

export const fetchCategory = async () => {
    
        const response = await api.get(`/category`)
        // console.log(response.data.data);
    
    return response.data;
}