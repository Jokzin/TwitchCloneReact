import axios from 'axios';

let api = axios.create({
    headers: {
        'Client-ID': process.env.REACT_APP_API_KEY
    }
})

export default api;