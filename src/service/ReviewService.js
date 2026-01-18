import {api} from "./axios.js"

export const fetchReviews = async(id) => {
    const res = await api.get(`/review/${id}`)

    return res.data;
}