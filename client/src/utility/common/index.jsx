import axios from 'axios';

const post = async (endpoint, data) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_HOST}${endpoint}`, data, { withCredentials: true });
        return response;

    } catch (error) {
        let message = error.message;
        
        if(error.response){
            message = error.response.data.error;
        }
        throw new Error(message);
    }
}

const get = async (endpoint) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_HOST}${endpoint}`, { withCredentials: true });
        return response;

    } catch (error) {
        let message = error.message;
        
        if(error.response){
            message = error.response.data.error;
        }
        throw new Error(message);
    }
}

export { post, get };